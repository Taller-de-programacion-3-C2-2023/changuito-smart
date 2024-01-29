import { MongoRepository } from './mongoRepository'

export default class ProductRepository extends MongoRepository {
  constructor(dbClient: any) {
    super(dbClient, 'db-changuito', 'products')
  }

  public async findByName(name: string) {
    const filter = { name: { $regex: `${name}`, $options: 'si' } }
    const result = await this.find(filter)
    return result
  }
}
