# Code Review Findings

Here is a summary of the issues identified in the frontend codebase and how they were resolved.

## 1. Inconsistent React State & Data Fetching
**What is wrong:** 
Some pages (`/activity`, `/reports`) fetched data directly inside `useEffect` blocks within the components, while `/tasks` used a dedicated custom hook (`useTasks`). Furthermore, there was no centralized service layer for frontend API calls.

**Why it matters:** 
Fetching data directly in components leads to tight coupling, makes testing difficult, and causes visual inconsistency in how loading/error states are handled across the application. It also violates the DRY principle if the same API needs to be called elsewhere.

**Suggested improvement (Implemented):** 
- Created a `services/` directory to abstract all frontend `fetch` calls.
- Standardized all pages to use custom hooks (`useActivity`, `useReports`, `useTasks`), completely stripping out raw `useEffect` logic from the UI components.
- Removed the redundant `lib/backendApi.ts` abstraction, instead making the Next.js API Routes fetch from the Express backend directly, creating a much cleaner proxy architecture.

## 2. Performance

* **Unnecessary Polling & Re-renders**: `app/activity/page.tsx` contained an interval running every 1.4 seconds (`setTick`) that constantly triggered re-renders even when data didn't change. Fixed by removing the `setInterval` completely.
* **Redundant Object Cloning**: The activity feed continuously cloned state arrays (`.map((item) => ({ ...item }))`) based on the artificial tick, causing excessive memory allocation and garbage collection thrashing. Fixed by removing the `forcedList` state entirely.
* **Redundant Filtering**: The search functionality applied filters twice sequentially (`applyFilterA` then `applyFilterB` on the result), doubling the iteration overhead. Fixed by consolidating into a single derived state using `useMemo`.

## 3. Maintainability & Code Quality

* **Duplicate Functions**: `formatTimeA`/`formatTimeB` and `applyFilterA`/`applyFilterB` were completely redundant. Fixed by stripping out duplicates and keeping a single, clean utility function.
* **State Mismanagement**: The component managed three separate state arrays (`allActivity`, `shownActivity`, `forcedList`) for a single data source. Fixed by storing only the raw `data` and the `searchQuery` in state, deriving the visible list dynamically during render.

## 3. UX & Architecture

* **Missing Loading States**: The `/api/activity` fetch request had no visual loading indicator, leaving the user staring at an empty list on slow connections. Fixed by adding proper `loading` and `error` state handling.
* **Basic Styling**: The original UI was purely functional with plain CSS. Improved the overall layout, typography, and visual hierarchy using modern design principles (soft shadows, responsive grids, and subtle interactions).
