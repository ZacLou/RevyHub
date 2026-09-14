import type { ExplorerErrorCode } from "@/features/multi-explorer-link-generator/types";

export function isExplorerError(e: unknown): boolean {
  return typeof e === "object" && e !== null && "code" in e;
}
