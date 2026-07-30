"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ActivityLog } from "@/types/api";

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    fetch("/api/activity")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch activity");
        return response.json();
      })
      .then((data: ActivityLog[]) => {
        if (isMounted) {
          setActivities(data || []);
          setError("");
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "An error occurred");
          setActivities([]);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleActivities = useMemo(() => {
    if (!query.trim()) return activities;
    
    const lowerQuery = query.toLowerCase();
    return activities.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(lowerQuery) ||
        (item.info || "").toLowerCase().includes(lowerQuery)
    );
  }, [activities, query]);

  function formatTime(value: string) {
    return new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <section className="card" style={{ padding: "1.5rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Activity Feed</h1>

        <input
          className="input"
          placeholder="Search activity..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      <section className="card" style={{ padding: "1rem" }}>
        <small style={{ color: "var(--muted)" }}>
          Total: {activities.length} | Visible: {visibleActivities.length}
        </small>
      </section>

      {loading && (
        <section className="card" style={{ padding: "1rem" }}>
          <p style={{ margin: 0, color: "var(--muted)" }}>Loading activity feed...</p>
        </section>
      )}

      {error && (
        <section className="card" style={{ padding: "1rem", borderColor: "var(--danger)" }}>
          <p style={{ margin: 0, color: "var(--danger)" }}>{error}</p>
        </section>
      )}

      {!loading && !error && visibleActivities.length === 0 && (
        <section className="card" style={{ padding: "1rem", textAlign: "center" }}>
          <p style={{ margin: 0, color: "var(--muted)" }}>No activity found.</p>
        </section>
      )}

      {!loading && !error && visibleActivities.length > 0 && (
        <section className="card" style={{ padding: "1rem" }}>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "1rem" }}>
            {visibleActivities.map((item) => (
              <li key={item.id} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.6rem" }}>
                <div style={{ fontWeight: 600 }}>{item.action || "Unknown action"}</div>
                <div style={{ color: "var(--text)" }}>{item.info || "No details provided"}</div>
                <small style={{ color: "var(--muted)" }}>{formatTime(item.when)}</small>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
