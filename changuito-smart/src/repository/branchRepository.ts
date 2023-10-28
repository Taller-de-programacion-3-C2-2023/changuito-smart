import { MongoRepository } from './mongoRepository'

export default class BranchRepository extends MongoRepository {
  constructor(dbClient: any) {
    super(dbClient, 'scrapper', 'branches')
  }

  public async findByLocation(lon: number, lat: number) {
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
    ]
    const result = await this.aggregate(pipeline)
    return result
  }
}
