import { requestJson } from "./api.service";
import type { ActivityLog } from "@/types/api";

export async function fetchActivityLogs(): Promise<ActivityLog[]> {
  return requestJson<ActivityLog[]>("/api/activity");
}
