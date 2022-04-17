export const formatCurrency = (priceString) => {
    return parseInt(priceString).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}