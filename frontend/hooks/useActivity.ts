"use client";

import { useEffect, useState } from "react";
import type { ActivityLog } from "@/types/api";
import { fetchActivityLogs } from "@/services/activity.service";
import { getErrorMessage } from "@/services/api.service";

export function useActivity() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const loadActivity = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchActivityLogs();
        if (isMounted) {
          setActivities(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(getErrorMessage(err, "Could not load activity right now."));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadActivity();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    activities,
    loading,
    error,
  };
}
