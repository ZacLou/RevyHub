import { ExternalLink } from "lucide-react";
import type { FeatureManifest } from "@/core/registry/types";

export const manifest: FeatureManifest = {
  slug: "multi-explplorer-link-generator",
  title: "Multi-Explorer Link Generator",
  description:
    "Generate links to Stellar blockchain explorers for accounts, transactions, and ledgers — fully offline.",
  character: "Every transaction tells a story — view it on any explorer.",
  category: "developer",
  status: "working",
  icon: ExternalLink,
  networks: ["testnet", "mainnet"],
  offline: true,
  keywords: ["explorer", "link", "stellar", "developer", "stellarscan", "stellarx"],
};
