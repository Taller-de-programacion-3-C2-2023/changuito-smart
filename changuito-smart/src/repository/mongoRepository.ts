import { mockedProducts } from './mockDB'

const collectionFind = (conn) => async (params: { modelName: string; filter?: any }) => {
  const { modelName, filter } = params
  const repository = await conn.db('db-changuito')
  const collection = repository.collection(modelName)
  const findResult = await collection.find({ nombre: /ocio/ }).toArray()
  return findResult
}

const collectionInsert = (conn) => async (params: { modelName: string }) => {
  const { modelName } = params
  const repository = await conn.db('db-changuito')
  const collection = repository.collection(modelName)
  const insertResult = await collection.insertMany(mockedProducts)
  // console.log('Found documents =>', insertResult)
  return insertResult
}

export default {
  collectionFind,
  collectionInsert,
}
