export type ExplorerType = "stellarscan" | "stellarx" | "steexp" | "lumenscan";

export type LinkTarget = "account" | "transaction" | "ledger" | "asset" | "offer";

export interface ExplorerLink {
  explorer: ExplorerType;
  name: string;
  url: string;
}

export interface MultiExplorerResult {
  target: LinkTarget;
  identifier: string;
  network: string;
  links: ExplorerLink[];
}

export type ExplorerErrorCode =
  | "empty_input"
  | "invalid_target"
  | "invalid_identifier";
