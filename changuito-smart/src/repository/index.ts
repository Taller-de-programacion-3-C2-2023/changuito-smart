import ProductRepository from './productRepository'
import BranchRepository from './branchRepository'

export const Repositories = (dbConnection: any) => ({
  product: new ProductRepository(dbConnection),
  branch: new BranchRepository(dbConnection),
})
