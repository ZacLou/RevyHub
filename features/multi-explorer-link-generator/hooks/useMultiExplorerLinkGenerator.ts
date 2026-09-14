"use client";

import { useCallback, useRef, useState } from "react";
import { useNetwork } from "@/core/network/NetworkProvider";
import { isErr, type Result } from "@/core/result/result";
import { parseMultiExplorerLinkGeneratorInput } from "@/features/multi-explorer-link-generator/schema";
import { runMultiExplorerLinkGenerator } from "@/features/multi-explorer-link-generator/lib/multiExplorerLinkGenerator";
import { toMultiExplorerLinkGeneratorErrorCode } from "@/features/multi-explorer-link-generator/lib/multiExplorerLinkGenerator.errors";
import type { MultiExplorerLinkGeneratorErrorCode, MultiExplorerLinkGeneratorResult } from "@/features/multi-explorer-link-generator/types";

export type MultiExplorerLinkGeneratorState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: MultiExplorerLinkGeneratorResult }
  | { status: "error"; code: MultiExplorerLinkGeneratorErrorCode };

export function useMultiExplorerLinkGenerator() {
  const { network } = useNetwork();
  const [state, setState] = useState<MultiExplorerLinkGeneratorState>({ status: "idle" });
  const controller = useRef<AbortController | null>(null);

  const submit = useCallback(
    async (raw: string) => {
      controller.current?.abort();
      const parsed = parseMultiExplorerLinkGeneratorInput(raw);
      if (isErr(parsed)) {
        setState({ status: "error", code: parsed.code });
        return;
      }

      const next = new AbortController();
      controller.current = next;
      setState({ status: "loading" });

      try {
        const result: Result<MultiExplorerLinkGeneratorResult, MultiExplorerLinkGeneratorErrorCode> = await runMultiExplorerLinkGenerator(
          parsed.value,
          network,
          next.signal
        );
        if (next.signal.aborted) return;
        setState(
          result.ok
            ? { status: "success", result: result.value }
            : { status: "error", code: result.code }
        );
      } catch (error) {
        if (next.signal.aborted) return;
        setState({ status: "error", code: toMultiExplorerLinkGeneratorErrorCode(error) });
      }
    },
    [network]
  );

  const reset = useCallback(() => {
    controller.current?.abort();
    setState({ status: "idle" });
  }, []);

  return { state, submit, reset };
}
