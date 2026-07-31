"use client";

import { useEffect, useState } from "react";
import {
  fetchReportsSummary,
  type ReportsSummary,
} from "@/services/reports.service";
import { getErrorMessage } from "@/services/api.service";

export function useReports() {
  const [summary, setSummary] = useState<ReportsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const loadReports = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchReportsSummary();
        if (isMounted) {
          setSummary(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(getErrorMessage(err, "Could not load reports right now."));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadReports();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    summary,
    loading,
    error,
  };
}
