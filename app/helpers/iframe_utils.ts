export function isInsideIframe(): boolean {
  return typeof window !== 'undefined' && window.location !== window.parent.location
}
