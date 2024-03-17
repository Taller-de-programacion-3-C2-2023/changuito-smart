import { MongoRepository } from './mongoRepository'
import { mongoDBName } from '.././config'

export default class PriceRepository extends MongoRepository {
  constructor(dbClient: any) {
    super(dbClient, mongoDBName, 'prices')
  }

  public async findBy(filter: { products?: string[]; branches?: string[] }) {
    const { products } = filter
    const result = await this.find({ productId: { $in: products } })
    return result
  }

  public async findByCart(filter: { products?: string[]; branches?: string[], date?: string }) {
    const { products, branches, date} = filter
    const dateFilter: string = date? date : (await this.status).lastScrap.toISOString().slice(0,10)
    const day = 9
    const customDateS = [`2024-03-${day}`, `2024-03-${day + 1}`]
    const customDate = [new Date(`2014-01-${day}`), new Date(`2014-01-${day + 1}`)]
    console.log(customDate)
    customDate.forEach((d) => d.setHours(0, 0, 0, 0))
    const pipeline = [
      {
        $match: {
          // date: { $gte: new Date(dateFilter) },
          date: {
                  $gt: new Date(customDateS[0]),
                  $lt: new Date(customDateS[1]),
              },
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
      { $sort: { '_id': 1 } },
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

  public async getLastScrapDate() {
    return (await this.status).lastScrap.toISOString().slice(0,10)
  }
}
