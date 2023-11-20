export const URL_SCRAP = process.env.MONGO_URI || 'https://d3e6htiiul5ek9.cloudfront.net/prod/productos?limit=100'

export const MONGO = {
  URL: process.env.MONGO_URI || 'mongodb://changuito:smart@localhost:27017/',
  DB: process.env.DB || 'db-changuito',
  COLLECTION: {
    PRODUCTS: process.env.PRODUCTS || 'products',
    PRICES: process.env.PRODUCTS || 'prices',
    BRANCHES: process.env.PRODUCTS || 'branches',
  },
}
