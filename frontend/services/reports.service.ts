import { requestJson } from "./api.service";
import type { ReportsSummary } from "../types/api";

export type { ReportsSummary } from "../types/api";

export async function fetchReportsSummary(): Promise<ReportsSummary> {
  return requestJson<ReportsSummary>("/api/reports");
}
