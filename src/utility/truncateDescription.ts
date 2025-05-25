export function truncateText(desc: string, maxWords = 10): string {
  const words = desc.trim().split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(' ') + '...'
    : desc;
}
