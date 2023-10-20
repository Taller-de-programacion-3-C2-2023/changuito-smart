import handlers from '../handlers'
import { getProductsSchema } from './schemas'

export const routes = async (app, opts) => {
  const { repository } = app
  app.route({
    url: '/products',
    method: 'GET',
    schema: getProductsSchema,
    handler: handlers.getProducts({ repository }),
  })
}
