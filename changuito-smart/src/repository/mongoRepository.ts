const collectionFind = (conn) => async (params: { modelName: string; filter?: any }) => {
  const { modelName, filter } = params
  const repository = await conn.db('db-changuito')
  const collection = repository.collection(modelName)
  const findResult = await collection.find({}).toArray()
  console.log('Found documents =>', findResult)
  return findResult
}

const collectionInsert = (conn) => async (params: { modelName: string }) => {
  const { modelName } = params
  const repository = await conn.db('db-changuito')
  const collection = repository.collection(modelName)
  const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }])
  console.log('Found documents =>', insertResult)
  return insertResult
}

export default {
  collectionFind,
  collectionInsert,
}
