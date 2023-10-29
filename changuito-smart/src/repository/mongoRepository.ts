export class MongoRepository {
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

  protected async aggregate(pipeline: Array<any>): Promise<any> {
    return await this.collection.aggregate(pipeline).toArray()
  }
}
