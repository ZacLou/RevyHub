import { Card } from "@/core/ui/Card";
import { copy } from "@/features/multi-explorer-link-generator/copy";
import type { MultiExplorerResult } from "@/features/multi-explorer-link-generator/types";

interface Props {
  result: MultiExplorerResult;
}

export function ExplorerLinkGeneratorResult({ result }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-[#172033]">{copy.resultTitle}</h3>

      {result.links.map((link) => (
        <Card key={link.explorer}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-[#172033]">{link.name}</span>
              <p className="text-xs text-[#68758a] font-mono mt-1 break-all">{link.url}</p>
            </div>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#6366f1] hover:underline whitespace-nowrap ml-4"
            >
              {copy.openUrl}
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}
