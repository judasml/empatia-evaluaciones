type IconName =
  | "arrow-left"
  | "arrow-right"
  | "bell"
  | "chart"
  | "check"
  | "chevron-left"
  | "chevron-right"
  | "clock"
  | "help"
  | "lock"
  | "mail"
  | "message-circle"
  | "palette"
  | "plus"
  | "settings"
  | "shield"
  | "upload"
  | "users";

type IconProps = {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 20 }: IconProps) {
  const paths: Record<IconName, React.ReactNode> = {
    "arrow-left": <path d="m15 18-6-6 6-6M9 12h11" />,
    "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9m6 10V5m6 14v-7m4 7H2" />
      </>
    ),
    check: <path d="m4 12.5 5 5L20 6.5" />,
    "chevron-left": <path d="m15 18-6-6 6-6" />,
    "chevron-right": <path d="m9 6 6 6-6 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .8-1 1.7M12 17h.01" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    "message-circle": <path d="M21 12a8 8 0 0 1-8 8H4l1.6-3.2A8 8 0 1 1 21 12Z" />,
    palette: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="8" cy="9" r=".7" fill="currentColor" />
        <circle cx="12" cy="7" r=".7" fill="currentColor" />
        <circle cx="16" cy="10" r=".7" fill="currentColor" />
        <path d="M15 17c0-1.1.9-2 2-2h2" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.7 2.7 8 7 10 4.3-2 7-5.3 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    upload: <path d="M12 16V4m-6 6 6-6 6 6M4 20h16" />,
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
