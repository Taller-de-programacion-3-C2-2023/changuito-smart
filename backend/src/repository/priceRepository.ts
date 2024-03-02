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
  public async findByCart(filter: { products?: string[]; branches?: string[]; lat; lon; }) {
    const { products, branches } = filter
    const pipeline = [
      {
        $match: {
          productId: { $in: products },
          branchId: { $in: branches },
        },
      },
      {
        $group: {
          _id: '$branchId',
          cartPrice: { $sum: '$price' },
          cartLength: { $count: {} },
          cartProducts: { $push: '$productId' },
        },
      },
      // TODO
      // { $skip: pagination?.offset },
      // { $limit: pagination?.limit },
    ]
    const result = await this.aggregate(pipeline)
    return result
  }
}
