export function formatPriceToDollars(price: number) {
  if (isNaN(price)) {
    return "Invalid price";
  }

  return `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}
