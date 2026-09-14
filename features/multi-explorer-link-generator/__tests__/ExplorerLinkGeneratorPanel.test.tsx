import { describe, it, expect } from "vitest";
import { renderFeature, screen } from "@/core/testing/render";
import { ExplorerLinkGeneratorPanel } from "@/features/multi-explorer-link-generator/components/ExplorerLinkGeneratorPanel";
import { copy } from "@/features/multi-explorer-link-generator/copy";

describe("ExplorerLinkGeneratorPanel", () => {
  it("renders form with empty state", () => {
    renderFeature(<ExplorerLinkGeneratorPanel />);
    expect(screen.getByText(copy.emptyTitle)).toBeTruthy();
  });

  it("has generate button", () => {
    renderFeature(<ExplorerLinkGeneratorPanel />);
    expect(screen.getByText(copy.submit)).toBeTruthy();
  });
});
