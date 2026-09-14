import { describe, it, expect } from "vitest";
import { truncateIdentifier } from "@/features/multi-explorer-link-generator/lib/format";

describe("truncateIdentifier", () => {
  it("truncates long identifiers", () => {
    const long = "G".repeat(60);
    expect(truncateIdentifier(long)).toContain("...");
  });
  it("keeps short identifiers", () => {
    expect(truncateIdentifier("GABC123")).toBe("GABC123");
  });
});
