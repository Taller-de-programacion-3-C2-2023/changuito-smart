import Fastify from 'fastify'
import { routes } from './routes'
import { mongoConfig } from './config'
import { dbClient } from './infra/db'
import { repository } from './repository'

export const app = (opts = {}) => {
  const app = Fastify(opts)

  const dbConnection = dbClient(mongoConfig)
  app.decorate('repository', repository(dbConnection))

  app.register(routes)

  return app
}
