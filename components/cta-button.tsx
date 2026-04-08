import Link from "next/link";

type CtaButtonProps = {
  href: string;
  label: string;
  external?: boolean;
  variant?: "primary" | "secondary";
};

export function getCtaButtonClassName(variant: "primary" | "secondary" = "primary") {
  return variant === "primary"
    ? "inline-flex items-center justify-center rounded-full bg-sand-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bone shadow-[0_18px_32px_rgba(132,81,28,0.26)] transition hover:bg-sand-500 hover:shadow-[0_20px_36px_rgba(132,81,28,0.34)]"
    : "inline-flex items-center justify-center rounded-full border border-border bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-sand-300 hover:bg-white";
}

export function CtaButton({
  href,
  label,
  external = false,
  variant = "primary",
}: CtaButtonProps) {
  const className = getCtaButtonClassName(variant);
  const isDirectLink = href.startsWith("tel:") || href.startsWith("mailto:");

  if (external || isDirectLink) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
