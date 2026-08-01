import type { ActivityLog } from "@/types/api";
import { ActivityItem } from "@/components/activity/ActivityItem";

type ActivityListProps = {
  activities: ActivityLog[];
};

export function ActivityList({ activities }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <section
        className="card"
        style={{ padding: "1rem", textAlign: "center" }}
      >
        <p style={{ margin: 0, color: "var(--muted)" }}>No activity found.</p>
      </section>
    );
  }

  return (
    <section className="card" style={{ padding: "1rem" }}>
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "grid",
          gap: "1rem",
        }}
      >
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </ul>
    </section>
  );
}
