import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useExplorerLinkGenerator } from "@/features/multi-explorer-link-generator/hooks/useExplorerLinkGenerator";
import { sampleAccountId } from "@/features/multi-explorer-link-generator/fixtures/explorerLinks.fixture";

describe("useExplorerLinkGenerator", () => {
  it("starts in idle state", () => {
    const { result } = renderHook(() => useExplorerLinkGenerator());
    expect(result.current.state.status).toBe("idle");
  });

  it("generates links for valid input", () => {
    const { result } = renderHook(() => useExplorerLinkGenerator());
    act(() => result.current.generate("account", sampleAccountId));
    expect(result.current.state.status).toBe("success");
    if (result.current.state.status === "success") {
      expect(result.current.state.result.links.length).toBe(4);
    }
  });

  it("returns error for empty input", () => {
    const { result } = renderHook(() => useExplorerLinkGenerator());
    act(() => result.current.generate("account", ""));
    expect(result.current.state.status).toBe("error");
  });

  it("returns to idle on reset", () => {
    const { result } = renderHook(() => useExplorerLinkGenerator());
    act(() => result.current.generate("account", sampleAccountId));
    act(() => result.current.reset());
    expect(result.current.state.status).toBe("idle");
  });
});
