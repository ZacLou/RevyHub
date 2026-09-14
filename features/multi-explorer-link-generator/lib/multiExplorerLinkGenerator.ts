import { ok, type Result } from "@/core/result/result";
import type { StellarNetwork } from "@/core/network/types";
import type { MultiExplorerLinkGeneratorErrorCode, MultiExplorerLinkGeneratorInput, MultiExplorerLinkGeneratorResult } from "@/features/multi-explorer-link-generator/types";

/** Core tool logic. Never throws for expected failures — returns a Result. */
export async function runMultiExplorerLinkGenerator(
  input: MultiExplorerLinkGeneratorInput,
  _network: StellarNetwork,
  _signal?: AbortSignal
): Promise<Result<MultiExplorerLinkGeneratorResult, MultiExplorerLinkGeneratorErrorCode>> {
  return ok({ summary: input.value });
}
