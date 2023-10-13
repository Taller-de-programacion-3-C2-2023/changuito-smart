import { getProducts } from './products'

export const routes = async (app, opts) => {
  const { repository } = app
  app.route({
    url: '/products',
    method: 'GET',
    //schema:
    handler: getProducts({ repository }),
  })
}
