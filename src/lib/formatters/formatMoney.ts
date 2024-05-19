export const formatMoney = (quantity: number) => {
    return `$${quantity.toLocaleString('en-US', { style: 'decimal' })}`
}