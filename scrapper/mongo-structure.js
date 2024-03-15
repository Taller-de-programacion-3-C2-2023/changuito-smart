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



async function main() {
  const client = new MongoClient(MONGO.URL)

  try {
    console.log(`Connecting to... ${MONGO.URL}`)
    await client.connect()
    const db = client.db(MONGO.DB)

    
    // const a = dropDuplicatedProducts(products)
    // const indexes = [...Array(5).keys()]
    // for (const d in indexes) {
    //   console.log(d+9)
    // }
    // var collection =  db.collection("prueba")
    // var allBooks =  await collection.find({ "date": new Date("2024-03-12") }).toArray();

    // allBooks.forEach(function(book){
    //   var updatedDate = new Date(book.date.setHours(0,0,0,0))
    //   collection.update({_id: book._id}, {date: updatedDate})
    // });

    // const coll = db.collection("prueba")//(MONGO.COLLECTION.PRICES)
    // // await coll.deleteMany({date: {$gte:  new Date('2024-03-12T00:00:44.602'),$lt:  new Date('2024-03-13T00:00:00.000Z')} })
    // await coll.deleteMany({date: new Date('2024-03-12T00:00:44.602') })
    // const kakka = await dropDuplicatedPricesByDay(coll, "2024-03-12", "2024-03-13")
    // const resultAsArray = await kakka.toArray();
    // let p = resultAsArray
    // resultAsArray.forEach(function  (doc) {
    //   p = coll.deleteMany({ _id: { $in: doc.dups.slice(1, doc.dups.length) } })
    //   console.log("deleted")
    // })
    // console.log(resultAsArray.length)
    // const por = await Promise.allSettled(p)
    // console.log(por)

    // const del = await products.deleteMany({
    //   'id': null
    // });

    
    // for (const coll of Object.values(MONGO.COLLECTION)) {
    //   const collection = db.collection(coll)
    //   // List the indexes on the collection and output them as an array
    //   const result = await collection.listIndexes().toArray()
    //   // Print the list of indexes
    //   console.log(`Existing indexes ${coll} :\n`, result)
    //   console.log('')
    // }
    // console.log('TERMINO')
    
  } catch (e) {
    console.error('Mongo structure fail with:', e)
  } finally {
    await client.close()
  }
}

// main()

async function dropDuplicatedProducts(col) {
  const result = await col
    .aggregate(
      [
        {
          $group: {
            _id: '$id',
            dups: {
              $push: '$_id',
            },
          },
        },
      ],
      { allowDiskUse: true }
    )
    .forEach(function (doc) {
      col.deleteMany({ _id: { $in: doc.dups.slice(1, doc.dups.length) } })
    })
  // return result
}

async function dropDuplicatedPricesByDay(col, date1, date2) {
  const result = await col
    .aggregate(
      [
        {
          $match: {
            date: {
              $gte: new Date(date1),
              $lt: new Date(date2),
            },
          },
        },
        {
          $group: {
            _id:{
              branchId: "$branchId",
              productId: "$productId"
            },
            dups: {
              $push: '$_id',
            },
          },
        },
      ],
      { allowDiskUse: true }
    )
    .forEach(function (doc) {
      col.deleteMany({ _id: { $in: doc.dups.slice(1, doc.dups.length) } })
  })
  // return result
}


// gruop by date
// db.sales.aggregate([
//   // First Stage
//   {
//     $match : { "date": { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") } }
//   },
//   // Second Stage
//   {
//     $group : {
//        _id : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//        totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
//        averageQuantity: { $avg: "$quantity" },
//        count: { $sum: 1 }
//     }
//   },
//   // Third Stage
//   {
//     $sort : { totalSaleAmount: -1 }
//   }
//  ])