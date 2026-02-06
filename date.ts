export function dateToTimestamp(date: Date): bigint {
  return BigInt(date.getTime()) * BigInt(1_000_000);
}

export function timestampToDate(timestamp: bigint): Date {
  return new Date(Number(timestamp / BigInt(1_000_000)));
}
