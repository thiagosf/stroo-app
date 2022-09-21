export function truncate(text: string, maxSize: number): string {
  if (text.length > maxSize) return text.substring(0, maxSize) + '...'
  return text
}

export function removeBreakLines(text: string): string {
  return text.replace(/[\r\n]/gm, ' ')
}
