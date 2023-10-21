export const appConfig = {
  port: +process.env.APP_PORT, // || 3030,
  host: process.env.APP_IP, // || '127.0.0.1',
}

export const mongoConfig = {
  url: 'mongodb://changuito:smart@localhost:27017/',
  forceClose: true,
}
