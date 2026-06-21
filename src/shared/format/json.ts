export function formatJSON(value: unknown): string {
  return JSON.stringify(value, null, 2);
}
