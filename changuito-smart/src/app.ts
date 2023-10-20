import Fastify from 'fastify'
import { routes } from './routes'
import { mongoConfig } from './config'
import { dbClient } from './infra/db'
import { repository } from './repository'
import { swagger, swaggerUiOptions } from './swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const app = (opts = {}) => {
  const app = Fastify(opts)
  app.register(require('@fastify/swagger'), swagger)
  app.register(fastifySwaggerUi, swaggerUiOptions)

  const dbConnection = dbClient(mongoConfig)

  app.decorate('repository', repository(dbConnection))

  app.register(routes)

  return app
}
