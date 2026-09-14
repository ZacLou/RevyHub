"use client";

import { useState } from "react";
import { Button } from "@/core/ui/Button";
import { Field } from "@/core/ui/field";
import { copy } from "@/features/multi-explorer-link-generator/copy";
import { detectTarget, getValidTargets } from "@/features/multi-explorer-link-generator/lib/explorerLinks";
import type { LinkTarget } from "@/features/multi-explorer-link-generator/types";

interface Props {
  onGenerate: (target: LinkTarget, identifier: string) => void;
}

export function ExplorerLinkGeneratorForm({ onGenerate }: Props) {
  const [identifier, setIdentifier] = useState("");
  const [target, setTarget] = useState<LinkTarget | "auto">("auto");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const detectedTarget = target === "auto" ? (detectTarget(identifier) || "account") : target;
    onGenerate(detectedTarget, identifier);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label={copy.formLabel} hint={copy.formHint} required>
        {({ inputId, describedBy, invalid }) => (
          <input
            id={inputId}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="G... or tx hash..."
            className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#172033] placeholder:text-[#9ca3af] focus:border-[#6366f1] focus:outline-none focus:ring-1 focus:ring-[#6366f1] font-mono"
          />
        )}
      </Field>

      <div>
        <label htmlFor="target-type" className="block text-sm font-bold text-[#172033]">
          {copy.targetLabel}
        </label>
        <select
          id="target-type"
          value={target}
          onChange={(e) => setTarget(e.target.value as any)}
          className="mt-1 w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#172033]"
        >
          <option value="auto">Auto-detect</option>
          {getValidTargets().map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <Button type="submit">{copy.submit}</Button>
    </form>
  );
}
