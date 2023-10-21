import mongoRepository from './mongoRepository'

export interface IRepository {
  get: (entity) => Promise<any>
  //   insert: (entity) => Promise<void>
}

export const repository = (dbConnection: any) => ({
  get: mongoRepository.collectionFind(dbConnection),
  create: mongoRepository.collectionInsert(dbConnection),
})
