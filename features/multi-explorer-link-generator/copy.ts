import type { ExplorerErrorCode } from "@/features/multi-explorer-link-generator/types";

export const copy = {
  formLabel: "Identifier",
  formHint: "Paste a Stellar account address (G...), transaction hash, ledger number, or other identifier.",
  submit: "Generate Links",
  loading: "Generating...",
  emptyTitle: "No links generated yet",
  emptyDescription: "Enter a Stellar identifier to generate links to blockchain explorers.",
  resultTitle: "Explorer Links",
  targetLabel: "Target Type",
  networkLabel: "Network",
  identifierLabel: "Identifier",
  copyUrl: "Copy URL",
  copied: "Copied!",
  openUrl: "Open",
} as const;

export const errorCopy: Record<
  ExplorerErrorCode,
  { title: string; description: string }
> = {
  empty_input: { title: "Enter an identifier", description: "Paste a Stellar account, transaction hash, or ledger number." },
  invalid_target: { title: "Invalid target", description: "Select a valid target type." },
  invalid_identifier: { title: "Invalid identifier", description: "The identifier format is not recognized." },
};
