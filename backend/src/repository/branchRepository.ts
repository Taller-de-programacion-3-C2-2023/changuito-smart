import { MongoRepository } from './mongoRepository'
import { mongoDBName } from '.././config'

export default class BranchRepository extends MongoRepository {
  constructor(dbClient: any) {
    super(dbClient, mongoDBName, 'branches')
  }

  public async findByLocation(lon: number, lat: number, pagination?: { limit: number; offset: number }) {
    const pipeline = [
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [Number(lon), Number(lat)] },
          distanceField: 'dist.calculated',
          includeLocs: 'dist.location',
          spherical: true,
        },
      },
      { $skip: pagination?.offset },
      { $limit: pagination?.limit },
    ]
    return this.aggregate(pipeline)
  }
}
