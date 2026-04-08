type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-400">
        {eyebrow}
      </p>
      <h2 className="max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-8 text-charcoal sm:text-lg">
        {description}
      </p>
    </div>
  );
}
