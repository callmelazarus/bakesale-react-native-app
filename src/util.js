// convert price in cents to dollar
export const priceDisplay = (priceInCent) => {
  // include $ symbol preceding
return `$${priceInCent / 100}`
}