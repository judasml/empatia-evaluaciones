import {
  useId,
  type ChangeEventHandler,
  type TextareaHTMLAttributes,
} from "react";

type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> & {
  label?: string;
  helper?: string;
  error?: string;
  showCount?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export function Textarea({
  label,
  helper,
  error,
  showCount = false,
  id,
  value,
  defaultValue,
  maxLength,
  onChange,
  className = "",
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const length =
    typeof value === "string"
      ? value.length
      : typeof defaultValue === "string"
        ? defaultValue.length
        : 0;
  const helperId = `${fieldId}-helper`;

  return (
    <div className={`ds-textarea ${className}`.trim()}>
      {label ? <label htmlFor={fieldId}>{label}</label> : null}
      <textarea
        id={fieldId}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={helper || error || showCount ? helperId : undefined}
        {...props}
      />
      <div className="ds-textarea__footer" id={helperId}>
        <span className={error ? "ds-textarea__error" : ""}>
          {error ?? helper ?? ""}
        </span>
        {showCount && maxLength ? (
          <span className="ds-textarea__count">
            {length}/{maxLength}
          </span>
        ) : null}
      </div>
    </div>
  );
}
