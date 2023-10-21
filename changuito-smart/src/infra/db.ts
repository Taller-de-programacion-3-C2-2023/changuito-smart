import { MongoClient } from 'mongodb'

const dbClient = (config: { url: string }) => {
  const mongoClient = new MongoClient(config.url)
  mongoClient.connect()
  return mongoClient
}

export { dbClient }
