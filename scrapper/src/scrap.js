import 'dotenv/config'
import { ProductScrapper } from './product.js'
import { MongoClient } from 'mongodb'
import { MONGO } from './configs.js'
import { ScrapperUI } from './tui.js';

// Exception is MongoBulkWriteError: E11000 duplicate key error collection: db-changui
// to.products index: unique_products_id dup key: { id: "7798260050226" }
export async function scrap() {
  const client = new MongoClient(MONGO.URL)
  const ui = new ScrapperUI();

  try {
    console.log('Starting...')
    console.log(`Connecting to... ${MONGO.URL}`)
    await client.connect()
    const db = client.db(MONGO.DB)

    const statusCol = db.collection(MONGO.COLLECTION.STATUS)
    const query = {}
    const update = { $set: { status: 'Started', lastScrap: new Date() } }
    const options = { upsert: true }
    await statusCol.updateOne(query, update, options)

    const productScrapper = new ProductScrapper(db, ui)
    const products = await productScrapper.getProducts()
    if (products.success) {
      ui.exit();
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
