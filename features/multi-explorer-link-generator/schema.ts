import { err, ok, type Result } from "@/core/result/result";
import { detectTarget } from "@/features/multi-explorer-link-generator/lib/explorerLinks";
import type { ExplorerErrorCode, LinkTarget } from "@/features/multi-explorer-link-generator/types";

const VALID_TARGETS: LinkTarget[] = ["account", "transaction", "ledger", "asset", "offer"];

export function parseExplorerInput(
  raw: string,
  target: LinkTarget = "account"
): Result<{ identifier: string; target: LinkTarget }, ExplorerErrorCode> {
  const identifier = raw.trim();
  if (!identifier) return err("empty_input");
  if (!VALID_TARGETS.includes(target)) return err("invalid_target");

  return ok({ identifier, target });
}
