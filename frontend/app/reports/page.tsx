"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircleDashed,
  ListTodo,
  ActivitySquare,
} from "lucide-react";

interface ReportsSummary {
  total: number;
  byStatus: {
    todo: number;
    "in-progress": number;
    done: number;
  };
  recentActivityCount: number;
}

export default function ReportsPage() {
  const [summary, setSummary] = useState<ReportsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch("/api/reports")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load reports");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setSummary(data);
          setError("");
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "An error occurred");
          setSummary(null);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </nav>

      <section className="card" style={{ padding: "2rem" }}>
        <h1
          style={{
            marginTop: 0,
            marginBottom: "0.5rem",
            fontSize: "2rem",
            letterSpacing: "-0.02em",
          }}
        >
          System Reports
        </h1>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Overview of task metrics and recent system activity.
        </p>
      </section>

      {loading && (
        <section
          className="card"
          style={{ padding: "3rem", textAlign: "center" }}
        >
          <p style={{ margin: 0, color: "var(--muted)", fontSize: "1.1rem" }}>
            Loading reports...
          </p>
        </section>
      )}

      {error && (
        <section
          className="card"
          style={{
            padding: "2rem",
            borderColor: "var(--danger)",
            background: "var(--danger-soft)",
          }}
        >
          <p style={{ margin: 0, color: "var(--danger)", fontWeight: 500 }}>
            {error}
          </p>
        </section>
      )}

      {!loading && !error && summary && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div
            className="card"
            style={{
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "4px solid var(--text)",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  color: "var(--muted)",
                  fontWeight: 500,
                }}
              >
                Total Tasks
              </h3>
              <p style={{ margin: 0, fontSize: "2.5rem", fontWeight: "700", color: "var(--text)" }}>
                {summary.total}
              </p>
            </div>
            <div style={{ color: "var(--text)", opacity: 0.8 }}>
              <ListTodo size={48} strokeWidth={1.5} />
            </div>
          </div>

          <div
            className="card"
            style={{
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "4px solid #10b981",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  color: "var(--muted)",
                  fontWeight: 500,
                }}
              >
                Done Tasks
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#10b981",
                }}
              >
                {summary.byStatus.done}
              </p>
            </div>
            <div style={{ color: "#10b981", opacity: 0.8 }}>
              <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>
          </div>

          <div
            className="card"
            style={{
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "4px solid #f59e0b",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  color: "var(--muted)",
                  fontWeight: 500,
                }}
              >
                Pending Tasks
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#f59e0b",
                }}
              >
                {summary.byStatus.todo + summary.byStatus["in-progress"]}
              </p>
            </div>
            <div style={{ color: "#f59e0b", opacity: 0.8 }}>
              <CircleDashed size={48} strokeWidth={1.5} />
            </div>
          </div>

          <div
            className="card"
            style={{
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "4px solid var(--primary)",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  color: "var(--muted)",
                  fontWeight: 500,
                }}
              >
                Recent Activities
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "var(--primary)",
                }}
              >
                {summary.recentActivityCount}
              </p>
            </div>
            <div style={{ color: "var(--primary)", opacity: 0.8 }}>
              <ActivitySquare size={48} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
