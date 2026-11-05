export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

