"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchReportsSummary, type ReportsSummary } from "@/services/reports.service";
import { getErrorMessage } from "@/services/api.service";

export function useReports() {
  const [summary, setSummary] = useState<ReportsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchReports = useCallback(async () => {
    let isMounted = true;
    try {
      setLoading(true);
      setError("");
      const data = await fetchReportsSummary();
      if (isMounted) setSummary(data);
    } catch (err) {
      if (isMounted) setError(getErrorMessage(err, "Could not load reports right now."));
    } finally {
      if (isMounted) setLoading(false);
    }
    
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const cleanup = fetchReports();
    return () => {
      cleanup.then(fn => fn && fn());
    };
  }, [fetchReports]);

  return {
    summary,
    loading,
    error,
    fetchReports,
  };
}
