export const dataMapper = (item, coinKey) => ({
  currency: item.currency,
  date: new Date(item.date),
  exchangeRate: item[coinKey],
  exchangeType: coinKey,
  id: item.id
})
