type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  /** draw a short lit rule before the label */
  rule?: boolean;
};

/** The recurring small, letter-spaced label that names each section. */
export default function Eyebrow({ children, className, rule = true }: EyebrowProps) {
  return (
    <p className={`flex items-center gap-4 ${className ?? ""}`}>
      {rule && <span aria-hidden className="h-px w-10 bg-gold/50" />}
      <span className="eyebrow">{children}</span>
    </p>
  );
}
