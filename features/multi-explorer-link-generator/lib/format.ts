export function truncateIdentifier(id: string, visible: number = 12): string {
  if (id.length <= visible * 2 + 3) return id;
  return `${id.slice(0, visible)}...${id.slice(-visible)}`;
}
