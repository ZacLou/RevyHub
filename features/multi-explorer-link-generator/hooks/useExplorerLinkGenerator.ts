"use client";

import { useCallback, useState } from "react";
import { generateExplorerLinks } from "@/features/multi-explorer-link-generator/lib/explorerLinks";
import type { ExplorerErrorCode, LinkTarget, MultiExplorerResult } from "@/features/multi-explorer-link-generator/types";

export type ExplorerState =
  | { status: "idle" }
  | { status: "success"; result: MultiExplorerResult }
  | { status: "error"; code: ExplorerErrorCode };

export function useExplorerLinkGenerator(network: string = "mainnet") {
  const [state, setState] = useState<ExplorerState>({ status: "idle" });

  const generate = useCallback((target: LinkTarget, identifier: string) => {
    const result = generateExplorerLinks(target, identifier, network);
    if (!result.ok) {
      setState({ status: "error", code: result.code });
    } else {
      setState({ status: "success", result: result.value });
    }
  }, [network]);

  const reset = useCallback(() => setState({ status: "idle" }), []);

  return { state, generate, reset };
}
