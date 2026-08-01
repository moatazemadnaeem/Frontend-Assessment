import { requestJson } from "./api.service";
import { ReportsSummary } from "../types/api";

export async function fetchReportsSummary(): Promise<ReportsSummary> {
  return requestJson<ReportsSummary>("/api/reports");
}
