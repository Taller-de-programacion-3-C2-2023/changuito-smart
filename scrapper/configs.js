export const URL_SCRAP = process.env.URL_SCRAP || 'https://d3e6htiiul5ek9.cloudfront.net/prod'
export const SCRAP = {
  URL_BASE: 'https://d3e6htiiul5ek9.cloudfront.net/prod',
  PRODUCT_ENDPOINT: '/productos?limit=100',
  BRANCHE_ENDPOINT: '/sucursales?limit=30',
}

export const MONGO = {
  URL: process.env.MONGO_URI || 'mongodb://changuito:smart@localhost:27017/',
  DB: process.env.DB || 'db-changuito',
  COLLECTION: {
    PRODUCTS: process.env.PRODUCTS || 'products',
    PRICES: process.env.PRICES || 'prices',
    BRANCHES: process.env.BRANCHES || 'branches',
    STATUS: process.env.STATUS || 'status',
  },
}
