import { describe, expect, it } from "vitest";
import { runMultiExplorerLinkGenerator } from "@/features/multi-explorer-link-generator/lib/multiExplorerLinkGenerator";

describe("runMultiExplorerLinkGenerator", () => {
  it("returns a summary for a valid input", async () => {
    const result = await runMultiExplorerLinkGenerator({ value: "example" }, "testnet");
    expect(result.ok).toBe(true);
  });
});
