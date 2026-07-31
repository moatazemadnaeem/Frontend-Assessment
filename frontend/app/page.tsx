import Link from "next/link";
import { LayoutDashboard, Activity, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      <header className="stack" style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ margin: 0, fontSize: "2.5rem", letterSpacing: "-0.02em" }}>
          VeeLion Platform
        </h1>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: "1.1rem" }}>
          Premium task management and activity monitoring system.
        </p>
      </header>

      <section
        className="stack"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}
      >
        <Link
          href="/tasks"
          className="card"
          style={{ padding: "1.5rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}
        >
          <div style={{ padding: "0.75rem", background: "var(--primary-soft)", borderRadius: "12px", color: "var(--primary)" }}>
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h2 style={{ margin: "0 0 0.25rem 0", fontSize: "1.25rem" }}>Task Dashboard</h2>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>Manage your tasks and track their completion status.</p>
          </div>
        </Link>

        <Link
          href="/activity"
          className="card"
          style={{ padding: "1.5rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}
        >
          <div style={{ padding: "0.75rem", background: "var(--primary-soft)", borderRadius: "12px", color: "var(--primary)" }}>
            <Activity size={28} />
          </div>
          <div>
            <h2 style={{ margin: "0 0 0.25rem 0", fontSize: "1.25rem" }}>Activity Feed</h2>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>Real-time monitoring of all system events and logs.</p>
          </div>
        </Link>

        <Link
          href="/reports"
          className="card"
          style={{ padding: "1.5rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}
        >
          <div style={{ padding: "0.75rem", background: "var(--primary-soft)", borderRadius: "12px", color: "var(--primary)" }}>
            <BarChart3 size={28} />
          </div>
          <div>
            <h2 style={{ margin: "0 0 0.25rem 0", fontSize: "1.25rem" }}>Reports Dashboard</h2>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>Aggregated statistics and high-level system metrics.</p>
          </div>
        </Link>
      </section>
    </main>
  );
}
