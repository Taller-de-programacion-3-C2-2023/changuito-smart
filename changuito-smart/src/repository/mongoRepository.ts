class MongoRepository {
  private dbClient: any
  private dbName: string
  private collectionName: string
  private collection: any

  constructor(dbClient: any, dbName: string, collectionName: string) {
    this.dbClient = dbClient
    this.dbName = dbName
    this.collectionName = collectionName
    this.collection = this.dbClient.db(this.dbName).collection(this.collectionName)
  }

  protected async find(filter: any = {}): Promise<any> {
    return await this.collection.find(filter).toArray()
  }

  protected async insert(documents: Array<any>): Promise<any> {
    return await this.collection.insertMany(documents)
  }
}

export class ProductRepository extends MongoRepository {
  constructor(dbClient: any) {
    super(dbClient, 'db-changuito', 'products')
  }

  public async findByName(name: string) {
    const filter = { nombre: { $regex: `${name}`, $options: 'si' } }
    const result = await this.find(filter)
    return result
  }
}
