import { paginationDefaults } from './../config/index'
import { MongoRepository } from './mongoRepository'

export default class BranchRepository extends MongoRepository {
  constructor(dbClient: any) {
    super(dbClient, 'db-changuito', 'branches')
  }

  public async findByLocation(lon: number, lat: number, pagination?: { limit: number; offset: number }) {
    console.log(`[${lon}, ${lat}]`)
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
    const result = await this.aggregate(pipeline)
    return result
  }
}
