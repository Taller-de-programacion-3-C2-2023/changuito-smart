import { getBranchesSchema, getProductsSchema } from './schemas'
import handlers from '../handlers'

export const routes = async (app, _opts) => {
  const { Repositories } = app
  const { get: branchesGetHandler } = handlers.BranchHandler(Repositories)
  const { get: getHandler } = handlers.ProductHandler(Repositories)

  app.route({
    url: '/products',
    method: 'GET',
    schema: getProductsSchema,
    handler: getHandler,
  })

  app.route({
    url: '/branches',
    method: 'GET',
    schema: getBranchesSchema,
    handler: branchesGetHandler,
  })
}
