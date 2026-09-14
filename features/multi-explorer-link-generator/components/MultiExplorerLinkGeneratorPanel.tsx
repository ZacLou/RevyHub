"use client";

import { Card } from "@/core/ui/Card";
import { StatusMessage } from "@/core/ui/StatusMessage";
import { useMultiExplorerLinkGenerator } from "@/features/multi-explorer-link-generator/hooks/useMultiExplorerLinkGenerator";
import { errorCopy } from "@/features/multi-explorer-link-generator/copy";
import { MultiExplorerLinkGeneratorForm } from "@/features/multi-explorer-link-generator/components/MultiExplorerLinkGeneratorForm";
import { MultiExplorerLinkGeneratorResult } from "@/features/multi-explorer-link-generator/components/MultiExplorerLinkGeneratorResult";
import { MultiExplorerLinkGeneratorEmptyState } from "@/features/multi-explorer-link-generator/components/MultiExplorerLinkGeneratorEmptyState";

export function MultiExplorerLinkGeneratorPanel() {
  const { state, submit } = useMultiExplorerLinkGenerator();

  return (
    <div className="space-y-5">
      <Card>
        <MultiExplorerLinkGeneratorForm onSubmit={submit} pending={state.status === "loading"} />
      </Card>

      {state.status === "error" ? (
        <StatusMessage
          type="error"
          title={errorCopy[state.code].title}
          description={errorCopy[state.code].description}
        />
      ) : null}

      {state.status === "success" ? <MultiExplorerLinkGeneratorResult result={state.result} /> : null}

      {state.status === "idle" ? <MultiExplorerLinkGeneratorEmptyState /> : null}
    </div>
  );
}
