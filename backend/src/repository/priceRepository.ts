import { MongoRepository } from './mongoRepository'

export default class PriceRepository extends MongoRepository {
  constructor(dbClient: any) {
    super(dbClient, 'db-changuito', 'prices')
  }

  public async findBy(filter: { products?: string[]; branches?: string[] }) {
    const { products } = filter
    const result = await this.find({ productId: { $in: products } })
    return result
  }

  // TODO ver que pasa si no se manda filtro
  public async findByCart(filter: { products?: string[]; branches?: string[] }) {
    const { products, branches } = filter
    const scrapDate = (await this.status).lastScrap || new Date('2023-11-19')
    const pipeline = [
      {
        $match: {
          date: { $gte: scrapDate },
          productId: { $in: products },
          branchId: { $in: branches },
        },
      },
      {
        $group: {
          _id: '$branchId',
          cartPrice: { $sum: '$price' },
          cartLength: { $count: {} },
          // cartProducts: { $push: '$productId' },
          cartProducts: { $push: { productId: '$productId', price: '$price' } },
        },
      },
    ]
    const result = await this.aggregate(pipeline)
    return result
  }

  public async findByDateRange(filter: { products?: string[]; fromDate: Date; toDate: Date }) {
    const { products, fromDate, toDate } = filter
    const pipeline = [
      {
        $match: {
          productId: { $in: products },
          date: {
            $gte: fromDate,
            $lt: toDate,
          },
        },
      },
      {
        $group: {
          _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, productId: '$productId' },
          priceAvg: { $avg: '$price' },
        },
      },
      { $sort: { '_id.date': 1 } },
      {
        $group: {
          _id: '$_id.productId',
          prices: { $push: { price: '$priceAvg', date: '$_id.date' } },
        },
      },
    ]
    const result = await this.aggregate(pipeline)
    return result
  }
}
