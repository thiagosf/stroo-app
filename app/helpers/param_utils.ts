export function isTruthy(value: any): boolean {
  return (
    value === 1 ||
    value === true ||
    value === '1' ||
    value === 'true'
  )
}
