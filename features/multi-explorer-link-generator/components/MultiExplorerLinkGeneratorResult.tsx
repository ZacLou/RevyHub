import { Card, CardHeader, CardTitle } from "@/core/ui/Card";
import { DataList } from "@/core/ui/DataList";
import { copy } from "@/features/multi-explorer-link-generator/copy";
import { formatSummary } from "@/features/multi-explorer-link-generator/lib/format";
import type { MultiExplorerLinkGeneratorResult as MultiExplorerLinkGeneratorResultValue } from "@/features/multi-explorer-link-generator/types";

export function MultiExplorerLinkGeneratorResult({ result }: { result: MultiExplorerLinkGeneratorResultValue }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.resultTitle}</CardTitle>
      </CardHeader>
      <DataList items={[{ label: "Summary", value: formatSummary(result.summary) }]} />
    </Card>
  );
}
