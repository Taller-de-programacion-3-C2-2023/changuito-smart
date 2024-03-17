import { MongoRepository } from './mongoRepository'
import { mongoDBName } from '.././config'

export default class ProductRepository extends MongoRepository {
  constructor(dbClient: any) {
    super(dbClient, mongoDBName, 'products')
  }

  public async findByName(name: string, pagination?: { limit: number; offset: number; sort?: any }) {
    const filter = { name: { $regex: `${name}`, $options: 'si' } }
    const result = await this.find(filter, pagination)
    return result
  }
}
