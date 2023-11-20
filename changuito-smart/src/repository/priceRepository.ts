import { MongoRepository } from './mongoRepository'

export default class PriceRepository extends MongoRepository {
  constructor(dbClient: any) {
    super(dbClient, 'db-changuito', 'prices')
  }

  public async findBy(filter: { products?: string[]; branches?: string[] }) {
    const { products } = filter
    console.log(products)
    const result = await this.find({ productId: { $in: products } })
    return result
  }

  // TODO ver que pasa si no se manda filtro
  public async findByCart(filter: { products?: string[]; branches?: string[] }) {
    const { products, branches } = filter
    const result = await this.find({ productId: { $in: products }, branchId: { $in: branches } })
    return result
  }
}
