
import { useEffect, useId, useRef, type ReactNode } from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  dock?: "center" | "bottom";
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  dock = "center",
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousActive = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousActive?.focus();
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className={`ds-dialog ds-dialog--${dock}`} onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className="ds-dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {dock === "bottom" ? (
          <span className="ds-dialog__handle" aria-hidden="true" />
        ) : null}
        <div>
          <h2 id={titleId}>{title}</h2>
          {description ? <p id={descriptionId}>{description}</p> : null}
        </div>
        {children}
        {footer ? <div className="ds-dialog__footer">{footer}</div> : null}
      </div>
    </div>
  );
}

