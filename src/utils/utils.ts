export const toRecord = <T>(data: T): Record<string, unknown> => {
  return data as unknown as Record<string, unknown>
}
