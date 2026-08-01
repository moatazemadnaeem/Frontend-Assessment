import { requestJson } from "./api.service";
import type { Task, TaskResponse, TasksResponse } from "@/types/api";

export async function fetchTasks(): Promise<Task[]> {
  const body = await requestJson<TasksResponse>("/api/tasks", {
    method: "GET",
  });
  return body.data;
}

export async function updateTask(taskId: string, completed: boolean): Promise<Task> {
  const body = await requestJson<TaskResponse>(`/api/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
  });
  return body.data;
}
