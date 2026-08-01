import type { ActivityLog } from "@/types/api";

type ActivityItemProps = {
  activity: ActivityLog;
};

function formatTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <li
      style={{
        borderBottom: "1px solid var(--border)",
        paddingBottom: "0.6rem",
      }}
    >
      <div style={{ fontWeight: 600 }}>
        {activity.action || "Unknown action"}
      </div>
      <div style={{ color: "var(--text)" }}>
        {activity.info || "No details provided"}
      </div>
      <small style={{ color: "var(--muted)" }}>
        {formatTime(activity.when)}
      </small>
    </li>
  );
}
