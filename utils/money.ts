// Formats a numeric/string amount as "2,000.00" — the Decimal scalar
// (Phase 4 ADR-013) always arrives over GraphQL as a string, so every
// call site passes it through Number() first; kept as one shared helper
// so the two-decimal-place convention is never accidentally dropped in
// one screen but not another.
export function formatMoney(amount: number | string): string {
  const value = typeof amount === 'string' ? Number(amount) : amount;
  if (Number.isNaN(value)) return '0.00';
  return value.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('en-GH', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleString('en-GH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}
