import * as React from "react";

type CtaButtonVariant = "primary" | "secondary";
type CtaButtonSize = "sm" | "md";

const primaryStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
};

export function CtaButton({
  href,
  children,
  className = "",
  variant = "primary",
  size = "md",
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: CtaButtonVariant;
  size?: CtaButtonSize;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}) {
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  const resolvedTarget = target ?? (isExternal ? "_blank" : undefined);
  const resolvedRel =
    rel ?? (resolvedTarget === "_blank" ? "noopener noreferrer" : undefined);

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50";
  const sizes: Record<CtaButtonSize, string> = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-5 text-base",
  };
  const variants: Record<CtaButtonVariant, string> = {
    primary:
      "text-white shadow-sm hover:shadow-[0_8px_20px_rgba(124,58,237,0.25)] hover:brightness-110 active:brightness-95",
    secondary:
      "border border-slate-200 bg-white text-slate-900 hover:border-primary-100 hover:bg-primary-50 active:bg-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-primary-100/40 dark:hover:bg-slate-700",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();

  return (
    <a
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      className={classes}
      style={variant === "primary" ? primaryStyle : undefined}
    >
      {children}
    </a>
  );
}
