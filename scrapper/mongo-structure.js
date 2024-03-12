import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { MONGO } from './configs.js'

async function main() {
  const client = new MongoClient(MONGO.URL)

  try {
    console.log(`Connecting to... ${MONGO.URL}`)
    await client.connect()
      const db = client.db(MONGO.DB)
      
      const products = db.collection(MONGO.COLLECTION.PRODUCTS)
      const a = await dropDup(products)
      
    // const del = await products.deleteMany({
    //   'id': null
    // });
    const result = await products.createIndex({ id: 1 } , { name: "unique_products_id", unique: true })
      console.log(`Index created: ${result}`)
      

    for (const coll of Object.values(MONGO.COLLECTION)) {
      const collection = db.collection(coll)
      // List the indexes on the collection and output them as an array
      const result = await collection.listIndexes().toArray()
      // Print the list of indexes
      console.log(`Existing indexes ${coll} :\n`, result)
      console.log('')
    }
  } catch (e) {
    console.error('Mongo structure fail with:', e)
  } finally {
    await client.close()
  }
}

main()

async function dropDup(col) {
    const result = await col.aggregate([
        { $group: {
         _id: '$id',
          dups: {
            $push: '$_id'
          }
        }},
    ], { allowDiskUse: true }).forEach(function (doc) {
        col.deleteMany({ _id: { $in: doc.dups.slice(1,  doc.dups.length  ) } })
    }
        )
    // return result
}
