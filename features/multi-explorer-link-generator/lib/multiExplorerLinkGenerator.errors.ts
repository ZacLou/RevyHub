import { classifyHorizonError } from "@/core/horizon/errors";
import type { MultiExplorerLinkGeneratorErrorCode } from "@/features/multi-explorer-link-generator/types";

/** Maps transport failures onto this tool's own error codes. */
export function toMultiExplorerLinkGeneratorErrorCode(error: unknown): MultiExplorerLinkGeneratorErrorCode {
  const { code } = classifyHorizonError(error);
  return code === "not_found" ? "not_found" : "request_failed";
}
