import ProductRepository from './productRepository'
import BranchRepository from './branchRepository'
import PriceRepository from './priceRepository'

export const Repositories = (dbConnection: any) => ({
  product: new ProductRepository(dbConnection),
  branch: new BranchRepository(dbConnection),
  price: new PriceRepository(dbConnection),
})
