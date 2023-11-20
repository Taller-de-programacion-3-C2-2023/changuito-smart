import 'dotenv/config'
import { ProductScrapper } from './product.js'
import { MongoClient } from 'mongodb'
import { MONGO } from './configs.js'

async function main() {
  const client = new MongoClient(MONGO.URL)

  try {
    console.log('Starting...')
    await client.connect()
    const db = client.db(MONGO.DB)

    const statusCol = db.collection('status')
    const query = {}
    const update = { $set: { status: 'Started' } }
    const options = { upsert: true }
    await statusCol.updateOne(query, update, options)

    const productScrapper = new ProductScrapper(db)
    const products = await productScrapper.getProducts()
    if (products.success) {
      console.info('Product scrapping finished')
    } else {
      console.warn('Scrapping interrupted at branch %s', products.lastId)
    }
  } catch (e) {
    console.error('Scrapper finished with error:', e)
  } finally {
    await client.close()
  }
}

main()
