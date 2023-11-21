export const appConfig = {
  port: +process.env.APP_PORT, // || 3030,
  host: process.env.APP_IP, // || '127.0.0.1',
}

export const corsConfig = (_instance?) => (req, callback) => {
  const corsOptions = {
    // This is NOT recommended for production as it enables reflection exploits
    origin: true,
  }
  // do not include CORS headers for requests from localhost
  if (/^localhost$/m.test(req.headers.origin)) {
    corsOptions.origin = false
  }
  // callback expects two parameters: error and options
  callback(null, corsOptions)
}

export const mongoConfig = {
  url: 'mongodb://changuito:smart@localhost:27017/',
  forceClose: true,
}

export const paginationDefaults = { offset: 0, limit: 20 }

export const locationDefault = { lat: -34.6109, lon: -58.3776 }
