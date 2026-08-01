"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CircleDashed,
  ListTodo,
  ActivitySquare,
} from "lucide-react";
import { MetricCard } from "@/components/reports/MetricCard";
import { useReports } from "@/hooks/useReports";

export default function ReportsPage() {
  const { summary, loading, error } = useReports();

  const pendingTasks = summary?.byStatus
    ? summary.byStatus.todo + summary.byStatus["in-progress"]
    : 0;

  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </nav>

      <section className="card reports-hero">
        <h1 className="reports-hero__title">System Reports</h1>
        <p className="reports-hero__description">
          Overview of task metrics and recent system activity.
        </p>
      </section>

      {loading && (
        <section className="card reports-state-card">
          <p className="reports-state-card__message">Loading reports...</p>
        </section>
      )}

      {error && (
        <section className="card reports-state-card reports-state-card--error">
          <p className="reports-state-card__message reports-state-card__message--error">
            {error}
          </p>
        </section>
      )}

      {!loading && !error && summary && (
        <div className="reports-grid">
          <MetricCard
            title="Total Tasks"
            value={summary.total}
            icon={ListTodo}
            accentColor="var(--text)"
            valueColor="var(--text)"
          />

          <MetricCard
            title="Done Tasks"
            value={summary.byStatus.done}
            icon={CheckCircle2}
            accentColor="#10b981"
            valueColor="#10b981"
          />

          <MetricCard
            title="Pending Tasks"
            value={pendingTasks}
            icon={CircleDashed}
            accentColor="#f59e0b"
            valueColor="#f59e0b"
          />

          <MetricCard
            title="Recent Activities"
            value={summary.recentActivityCount}
            icon={ActivitySquare}
            accentColor="var(--primary)"
            valueColor="var(--primary)"
          />
        </div>
      )}
    </main>
  );
}
