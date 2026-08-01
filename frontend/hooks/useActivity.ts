"use client";

import { useCallback, useEffect, useState } from "react";
import type { ActivityLog } from "@/types/api";
import { fetchActivityLogs } from "@/services/activity.service";
import { getErrorMessage } from "@/services/api.service";

export function useActivity() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchActivity = useCallback(async () => {
    let isMounted = true;
    try {
      setLoading(true);
      setError("");
      const data = await fetchActivityLogs();
      if (isMounted) setActivities(data || []);
    } catch (err) {
      if (isMounted) setError(getErrorMessage(err, "Could not load activity right now."));
    } finally {
      if (isMounted) setLoading(false);
    }
    
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const cleanup = fetchActivity();
    return () => {
      cleanup.then(fn => fn && fn());
    };
  }, [fetchActivity]);

  return {
    activities,
    loading,
    error,
    fetchActivity,
  };
}
