import { ProductRepository } from './mongoRepository'

export const Repositories = (dbConnection: any) => ({
  product: new ProductRepository(dbConnection),
})
