import {
  getBranchesSchema,
  getCartSchema,
  getPricesSchema,
  getPriceRecordsSchema,
  getProductsSchema,
  postBranchesSearchSchema,
} from './schemas'
import handlers from '../handlers'

export const routes = async (app, _opts) => {
  const { Repositories } = app
  const { get: branchesGetHandler, postSearch: postSearch } = handlers.BranchHandler(Repositories)
  const { get: getHandler } = handlers.ProductHandler(Repositories)
  const { get: getPrices } = handlers.PriceHandler(Repositories)
  const { get: getPriceRecords } = handlers.PriceRecordHandler(Repositories)
  const { get: getCart } = handlers.CartHandler(Repositories)

  app.route({
    url: '/products',
    method: 'GET',
    schema: getProductsSchema,
    handler: getHandler,
  })

  app.route({
    url: '/prices',
    method: 'GET',
    schema: getPricesSchema,
    handler: getPrices,
  })

  app.route({
    url: '/prices/record',
    method: 'GET',
    schema: getPriceRecordsSchema,
    handler: getPriceRecords,
  })

  app.route({
    url: '/branches',
    method: 'GET',
    schema: getBranchesSchema,
    handler: branchesGetHandler,
  })

  app.route({
    url: '/cart',
    method: 'GET',
    schema: getCartSchema,
    handler: getCart,
  })
}
