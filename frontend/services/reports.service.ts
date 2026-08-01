import { requestJson } from "./api.service";

// Note: Ensure ReportsSummary type is accessible if it was moved to types/api.ts
// For now, we will use any, or define the shape inline as per original page.tsx
export interface ReportsSummary {
  total: number;
  byStatus: {
    todo: number;
    "in-progress": number;
    done: number;
  };
  recentActivityCount: number;
}

export async function fetchReportsSummary(): Promise<ReportsSummary> {
  return requestJson<ReportsSummary>("/api/reports");
}
