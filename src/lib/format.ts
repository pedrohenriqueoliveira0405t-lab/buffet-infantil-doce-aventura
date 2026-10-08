const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

/** 13900 -> "R$ 13.900" */
export function formatPrice(value: number): string {
  return currency.format(value);
}

/** Remove os marcadores de destaque (*texto*) de um título. */
export function stripHighlight(text: string): string {
  return text.replace(/\*/g, "");
}
