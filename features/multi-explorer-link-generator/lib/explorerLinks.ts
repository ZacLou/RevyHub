import { Keypair, StrKey } from "@stellar/stellar-sdk";
import { ok, err, type Result } from "@/core/result/result";
import type {
  ExplorerLink,
  ExplorerType,
  LinkTarget,
  MultiExplorerResult,
  ExplorerErrorCode,
} from "@/features/multi-explorer-link-generator/types";

const EXPLORER_URLS: Record<ExplorerType, Record<string, string>> = {
  stellarscan: {
    mainnet: "https://stellarscan.io",
    testnet: "https://testnet.stellarscan.io",
  },
  stellarx: {
    mainnet: "https://stellarx.com",
    testnet: "https://testnet.stellarx.com",
  },
  steexp: {
    mainnet: "https://steexp.com",
    testnet: "https://testnet.steexp.com",
  },
  lumenscan: {
    mainnet: "https://lumenscan.io",
    testnet: "https://testnet.lumenscan.io",
  },
};

const EXPLORER_NAMES: Record<ExplorerType, string> = {
  stellarscan: "StellarScan",
  stellarx: "StellarX",
  steexp: "Steexp",
  lumenscan: "Lumenscan",
};

const VALID_TARGETS: LinkTarget[] = ["account", "transaction", "ledger", "asset", "offer"];

export function generateExplorerLinks(
  target: LinkTarget,
  identifier: string,
  network: string
): Result<MultiExplorerResult, ExplorerErrorCode> {
  if (!identifier.trim()) return err("empty_input");
  if (!VALID_TARGETS.includes(target)) return err("invalid_target");

  const links: ExplorerLink[] = [];
  const explorers: ExplorerType[] = ["stellarscan", "stellarx", "steexp", "lumenscan"];

  for (const explorer of explorers) {
    const baseUrl = EXPLORER_URLS[explorer][network] || EXPLORER_URLS[explorer]["mainnet"];
    const url = buildExplorerUrl(baseUrl, target, identifier);
    links.push({ explorer, name: EXPLORER_NAMES[explorer], url });
  }

  return ok({ target, identifier, network, links });
}

function buildExplorerUrl(baseUrl: string, target: LinkTarget, identifier: string): string {
  switch (target) {
    case "account": return `${baseUrl}/account/${identifier}`;
    case "transaction": return `${baseUrl}/tx/${identifier}`;
    case "ledger": return `${baseUrl}/ledger/${identifier}`;
    case "asset": return `${baseUrl}/asset/${identifier}`;
    case "offer": return `${baseUrl}/offer/${identifier}`;
    default: return baseUrl;
  }
}

export function detectTarget(identifier: string): LinkTarget | null {
  if (identifier.startsWith("G") && StrKey.isValidEd25519PublicKey(identifier)) return "account";
  if (identifier.startsWith("S") && StrKey.isValidEd25519SecretSeed(identifier)) return null; // Don't expose seeds
  if (/^[a-f0-9]{64}$/i.test(identifier)) return "transaction";
  if (/^\d+$/.test(identifier)) return "ledger";
  return "account"; // Default
}

export function getValidTargets(): LinkTarget[] {
  return [...VALID_TARGETS];
}

export function getExplorerNames(): Record<ExplorerType, string> {
  return { ...EXPLORER_NAMES };
}
