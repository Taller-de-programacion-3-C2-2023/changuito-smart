import Fastify from 'fastify'
import { routes } from './routes'
import { mongoConfig } from './config'
import { swagger, swaggerUiOptions } from './swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const app = (opts = {}) => {
  const app = Fastify(opts)
  app.register(require('@fastify/swagger'), swagger)
  app.register(fastifySwaggerUi, swaggerUiOptions)

  app.register(require('@fastify/mongodb'), mongoConfig)
  app.register(require('./plugins/repository'))

  app.register(routes)

  return app
}
