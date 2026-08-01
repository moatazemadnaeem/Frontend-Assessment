"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ActivityList } from "@/components/activity/ActivityList";
import { ActivitySearch } from "@/components/activity/ActivitySearch";
import { useActivity } from "@/hooks/useActivity";

export default function ActivityPage() {
  const { activities, loading, error } = useActivity();
  const [query, setQuery] = useState("");

  const visibleActivities = useMemo(() => {
    if (!query.trim()) return activities;

    const lowerQuery = query.toLowerCase();
    return activities.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(lowerQuery) ||
        (item.info || "").toLowerCase().includes(lowerQuery),
    );
  }, [activities, query]);

  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <ActivitySearch query={query} onQueryChange={setQuery} />

      <section className="card" style={{ padding: "1rem" }}>
        <small style={{ color: "var(--muted)" }}>
          Total: {activities.length} | Visible: {visibleActivities.length}
        </small>
      </section>

      {loading && (
        <section className="card" style={{ padding: "1rem" }}>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Loading activity feed...
          </p>
        </section>
      )}

      {error && (
        <section
          className="card"
          style={{ padding: "1rem", borderColor: "var(--danger)" }}
        >
          <p style={{ margin: 0, color: "var(--danger)" }}>{error}</p>
        </section>
      )}

      {!loading && !error && <ActivityList activities={visibleActivities} />}
    </main>
  );
}
