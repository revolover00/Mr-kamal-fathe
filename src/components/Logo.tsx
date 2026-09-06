type LogoProps = {
  size?: "sm" | "lg";
  light?: boolean;
};

export default function Logo({ size = "sm", light = false }: LogoProps) {
  const big = size === "lg";
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <svg
        viewBox="0 0 64 64"
        className={big ? "h-14 w-14" : "h-10 w-10"}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="kf-logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbb03b" />
            <stop offset="1" stopColor="#f22912" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#kf-logo-g)" strokeWidth="5">
          <ellipse cx="32" cy="32" rx="26" ry="11" />
          <ellipse cx="32" cy="32" rx="26" ry="11" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="26" ry="11" transform="rotate(120 32 32)" />
        </g>
        <circle cx="32" cy="32" r="7" fill="#f7941d" />
        <circle cx="52" cy="14" r="4" fill="#fbb03b" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`${
            big ? "text-2xl" : "text-lg"
          } font-black tracking-tight ${light ? "text-white" : "text-ink dark:text-white"}`}
        >
          كمال فتحي
        </span>
        <span
          className={`${
            big ? "text-[11px]" : "text-[9px]"
          } font-bold tracking-[0.45em] text-brand`}
        >
          للفيزياء
        </span>
      </span>
    </span>
  );
}
