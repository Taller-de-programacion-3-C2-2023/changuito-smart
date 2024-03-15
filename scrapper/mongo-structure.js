import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { MONGO } from './configs.js'

async function setIndexes() {
  const client = new MongoClient(MONGO.URL)

  try {
    console.log(`Connecting to... ${MONGO.URL}`)
    await client.connect()
    const db = client.db(MONGO.DB)

    const products = db.collection(MONGO.COLLECTION.PRODUCTS)
    const productsresult = await products.createIndex({ id: 1 }, { name: "unique_products_id", unique: true })
    console.log(`Index created: ${productsresult}`)
    
    const branches = db.collection(MONGO.COLLECTION.BRANCHES)
    const branchesresult = await branches.createIndex({ id: 1 }, { name: "unique_branches_id", unique: true })
    console.log(`Index created: ${branchesresult}`)
    
    const prices = db.collection(MONGO.COLLECTION.PRICES)
    const pricesresult = await prices.createIndex({ branchId:1, productId:1 , date: 1}, { name: "unique_prices", unique: true })
    console.log(`Index created: ${pricesresult}`)

  } catch (e) {
    console.error('Mongo structure fail with:', e)
  } finally {
    console.log(`Closing conection to ${MONGO.URL}`)
    await client.close()
  }
}

setIndexes()
