export const SCRAP = {
  URL_BASE: 'https://d3e6htiiul5ek9.cloudfront.net/prod',
  PRODUCT_ENDPOINT: '/productos?limit=100',
  BRANCH_ENDPOINT: '/sucursales?limit=30',
  CONCURRENT_QUERIES: process.env.CONCURRENT_QUERIES || 6,
  BRANCH_LIMIT: 20,
  BRANCH_CENTER: [-58.3776, -34.6109]
}

export const MONGO = {
  URL: process.env.MONGO_URI || 'mongodb://changuito:smart@172.23.0.2:27017/',
  DB: process.env.DB || 'db-changuito',
  COLLECTION: {
    PRODUCTS: process.env.PRODUCTS || 'products',
    PRICES: process.env.PRICES || 'prices',
    BRANCHES: process.env.BRANCHES || 'branches',
    STATUS: process.env.STATUS || 'status',
  },
}

export const THROTTLE_SECS = 30;
