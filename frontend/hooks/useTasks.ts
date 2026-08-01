"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task, TaskFilter } from "@/types/api";
import { fetchTasks as fetchTasksService, updateTask as updateTaskService } from "@/services/tasks.service";
import { getErrorMessage } from "@/services/api.service";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [updatingTaskId, setUpdatingTaskId] = useState<string>("");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchTasksService();
      setTasks(data);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load tasks right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTaskStatus = useCallback(async (taskId: string, completed: boolean) => {
    try {
      setUpdatingTaskId(taskId);
      setError("");
      const updatedTask = await updateTaskService(taskId, completed);
      setTasks((previous) =>
        previous.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      setError(getErrorMessage(error, "Could not update task status."));
    } finally {
      setUpdatingTaskId("");
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  return {
    tasks,
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    setFilter,
    fetchTasks,
    updateTaskStatus,
  };
}
