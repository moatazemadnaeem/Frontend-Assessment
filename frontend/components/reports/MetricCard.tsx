import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  accentColor: string;
  valueColor: string;
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  accentColor,
  valueColor,
}: MetricCardProps) {
  return (
    <article
      className="card metric-card"
      style={{ ["--metric-accent" as string]: accentColor }}
    >
      <div className="metric-card__content">
        <h3 className="metric-card__title">{title}</h3>
        <p className="metric-card__value" style={{ color: valueColor }}>
          {value}
        </p>
      </div>

      <div className="metric-card__icon" style={{ color: accentColor }}>
        <Icon size={48} strokeWidth={1.5} />
      </div>
    </article>
  );
}
