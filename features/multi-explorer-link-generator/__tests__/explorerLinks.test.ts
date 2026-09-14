import { describe, it, expect } from "vitest";
import {
  generateExplorerLinks,
  detectTarget,
  getValidTargets,
  getExplorerNames,
} from "@/features/multi-explorer-link-generator/lib/explorerLinks";
import { sampleAccountId, sampleTxHash, sampleLedger } from "@/features/multi-explorer-link-generator/fixtures/explorerLinks.fixture";

describe("generateExplorerLinks", () => {
  it("generates links for account", () => {
    const result = generateExplorerLinks("account", sampleAccountId, "mainnet");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.links.length).toBe(4);
      expect(result.value.links[0].url).toContain("stellarscan.io");
    }
  });

  it("generates links for testnet", () => {
    const result = generateExplorerLinks("account", sampleAccountId, "testnet");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.links[0].url).toContain("testnet");
    }
  });

  it("generates links for transaction", () => {
    const result = generateExplorerLinks("transaction", sampleTxHash, "mainnet");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.links[0].url).toContain("/tx/");
    }
  });

  it("generates links for ledger", () => {
    const result = generateExplorerLinks("ledger", sampleLedger, "mainnet");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.links[0].url).toContain("/ledger/");
    }
  });

  it("rejects empty identifier", () => {
    expect(generateExplorerLinks("account", "", "mainnet").ok).toBe(false);
  });

  it("rejects invalid target", () => {
    expect(generateExplorerLinks("invalid" as any, sampleAccountId, "mainnet").ok).toBe(false);
  });
});

describe("detectTarget", () => {
  it("detects account", () => {
    expect(detectTarget(sampleAccountId)).toBe("account");
  });

  it("detects transaction", () => {
    expect(detectTarget(sampleTxHash)).toBe("transaction");
  });

  it("detects ledger", () => {
    expect(detectTarget(sampleLedger)).toBe("ledger");
  });

  it("defaults to account for unknown", () => {
    expect(detectTarget("unknown_format")).toBe("account");
  });
});

describe("getValidTargets", () => {
  it("returns all targets", () => {
    expect(getValidTargets().length).toBe(5);
  });
});

describe("getExplorerNames", () => {
  it("returns explorer names", () => {
    const names = getExplorerNames();
    expect(names.stellarscan).toBe("StellarScan");
    expect(names.stellarx).toBe("StellarX");
  });
});
