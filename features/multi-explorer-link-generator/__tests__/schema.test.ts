import { describe, it, expect } from "vitest";
import { parseExplorerInput } from "@/features/multi-explorer-link-generator/schema";
import { sampleAccountId } from "@/features/multi-explorer-link-generator/fixtures/explorerLinks.fixture";

describe("parseExplorerInput", () => {
  it("accepts valid input", () => {
    const result = parseExplorerInput(sampleAccountId);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.identifier).toBe(sampleAccountId);
    }
  });

  it("rejects empty input", () => {
    expect(parseExplorerInput("").ok).toBe(false);
  });

  it("rejects invalid target", () => {
    expect(parseExplorerInput(sampleAccountId, "invalid" as any).ok).toBe(false);
  });

  it("trims whitespace", () => {
    const result = parseExplorerInput(`  ${sampleAccountId}  `);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.identifier).toBe(sampleAccountId);
    }
  });
});
