const STATUS = "status"

export class MongoRepository {
  private dbClient: any
  private dbName: string
  private collectionName: string
  private collection: any
  protected status: Promise<any>

  constructor(dbClient: any, dbName: string, collectionName: string) {
    console.warn("DB NAME: ", dbName);
    this.dbClient = dbClient
    this.dbName = dbName
    this.collectionName = collectionName;
    const db = this.dbClient.db(this.dbName);
    const statusCollection = db.collection(STATUS);
    this.status = statusCollection.findOne({})
    this.collection = db.collection(this.collectionName)
  }

  protected async find(filter: any = {}, pagination?: { limit: number; offset: number; sort?: any }): Promise<any> {
    const { limit, offset: skip, sort } = pagination || {}
    return await this.collection.find(filter, { sort, limit, skip }).toArray()
  }

  protected async insert(documents: Array<any>): Promise<any> {
    return await this.collection.insertMany(documents)
  }

  protected async aggregate(pipeline: Array<any>): Promise<any> {
    return await this.collection.aggregate(pipeline).toArray()
  }
}
