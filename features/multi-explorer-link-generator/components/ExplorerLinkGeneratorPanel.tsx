"use client";

import { Card } from "@/core/ui/Card";
import { StatusMessage } from "@/core/ui/StatusMessage";
import { useExplorerLinkGenerator } from "@/features/multi-explorer-link-generator/hooks/useExplorerLinkGenerator";
import { copy, errorCopy } from "@/features/multi-explorer-link-generator/copy";
import { ExplorerLinkGeneratorForm } from "@/features/multi-explorer-link-generator/components/ExplorerLinkGeneratorForm";
import { ExplorerLinkGeneratorResult } from "@/features/multi-explorer-link-generator/components/ExplorerLinkGeneratorResult";
import { ExplorerLinkGeneratorEmptyState } from "@/features/multi-explorer-link-generator/components/ExplorerLinkGeneratorEmptyState";

export function ExplorerLinkGeneratorPanel() {
  const { state, generate } = useExplorerLinkGenerator();

  return (
    <div className="space-y-5">
      <Card>
        <ExplorerLinkGeneratorForm onGenerate={generate} />
      </Card>

      {state.status === "error" ? (
        <StatusMessage
          type="error"
          title={errorCopy[state.code].title}
          description={errorCopy[state.code].description}
        />
      ) : null}

      {state.status === "success" ? (
        <ExplorerLinkGeneratorResult result={state.result} />
      ) : null}

      {state.status === "idle" ? <ExplorerLinkGeneratorEmptyState /> : null}
    </div>
  );
}
