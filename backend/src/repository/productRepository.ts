import { MongoRepository } from './mongoRepository'

export default class ProductRepository extends MongoRepository {
  constructor(dbClient: any) {
    super(dbClient, 'db-changuito', 'products')
  }

  public async findByName(name: string, pagination?: { limit: number; offset: number; sort?: any }) {
    const filter = { $text: { $search: `${name}` } }
    const filterOptions = {sort: {'score': {'$meta': 'textScore'}}}
    const result = await this.find(filter, {...pagination, ...filterOptions});
    return result
  }
}
