
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { MONGO } from './src/configs.js'

async function run() {
    const client = new MongoClient(MONGO.URL)
    try {
        const collectionName = MONGO.COLLECTION.BRANCHES
        await client.connect()
        const db = client.db(MONGO.DB)
        const collection = db.collection(collectionName)
        dropDuplicatedProducts(collection)

        // for (const coll of Object.values(MONGO.COLLECTION)) {
        //     const collection = db.collection(coll)
        //     // List the indexes on the collection and output them as an array
        //     const result = await collection.listIndexes().toArray()
        //     // Print the list of indexes
        //     console.log(`Existing indexes ${coll} :\n`, result)
        //     console.log('')
        // }

        // var finded = await collection.find(
        //     { "date": new Date("2024-03-15") }
        // ).toArray();

        // var deleted = await collection.deleteMany(
        //     { id: null }
        // )
        // console.log(deleted)

        // const updated = await collection.updateMany(
        //     { date: { $gte: new Date("2024-03-16") } },
        //     { $set: { date: new Date("2024-03-15") } },
        //     // {
        //     //   upsert: <boolean>,
        //     //   writeConcern: <document>,
        //     //   collation: <document>,
        //     //   arrayFilters: [ <filterdocument1>, ... ],
        //     //   hint:  <document|string>        // Available starting in MongoDB 4.2.1
        //     // }
        // )

        // const day = 14
        // const customDateS = [`2024-03-${day}`, `2024-03-${day + 1}`]
        // const customDate = [new Date(`2014-01-${day}`), new Date(`2014-01-${day + 1}`)]
        // console.log(customDate)

        // customDate.forEach((d) => d.setHours(0, 0, 0, 0))

        // const grouped = await collection.aggregate([
        //     // First Stage
        //     {
        //         $match: {
        //             date:
        //             {
        //                 $gt: new Date(customDateS[0]),
        //                 $lt: new Date(customDateS[1]),
        //             },
        //         },

        //     },
        //     // Second Stage
        //     {
        //         $group: {
        //             _id: {
        //                 branchId: "$branchId",
        //                 productId: "$productId",
        //                 price: "$price",
        //             },
        //             date: { $min: "$date" }

        //         }
        //     },
        //     // Third Stage
        //     {
        //         $project: {
        //             _id: 0,
        //             branchId: "$_id.branchId",
        //             productId: "$_id.productId",
        //             price: "$_id.price",
        //             date: 1
        //         }
        //     },
        //     { $limit: 5}
        // ])
        // const result = await grouped.toArray()
        // console.log(result)


    } catch (e) {
        console.error('Mongo structure fail with:', e)
    } finally {
        await client.close()
    }
}

run().then(() => console.info('Finished')).catch((r) => console.error("ERROR ", r))

async function lalal() {
    const client = new MongoClient(MONGO.URL)


    console.log(`Connecting to... ${MONGO.URL}`)
    await client.connect()
    const db = client.db(MONGO.DB)


    const a = dropDuplicatedProducts(products)
    const indexes = [...Array(5).keys()]
    for (const d in indexes) {
        console.log(d + 9)
    }
    var collection = db.collection("prueba")


    allBooks.forEach(function (book) {
        var updatedDate = new Date(book.date.setHours(0, 0, 0, 0))
        collection.update({ _id: book._id }, { date: updatedDate })
    });

    const coll = db.collection("prueba")//(MONGO.COLLECTION.PRICES)
    // await coll.deleteMany({date: {$gte:  new Date('2024-03-12T00:00:44.602'),$lt:  new Date('2024-03-13T00:00:00.000Z')} })
    await coll.deleteMany({ date: new Date('2024-03-12T00:00:44.602') })
    const kakka = await dropDuplicatedPricesByDay(coll, "2024-03-12", "2024-03-13")
    const resultAsArray = await kakka.toArray();
    let p = resultAsArray
    resultAsArray.forEach(function (doc) {
        p = coll.deleteMany({ _id: { $in: doc.dups.slice(1, doc.dups.length) } })
        console.log("deleted")
    })
    console.log(resultAsArray.length)
    const por = await Promise.allSettled(p)
    console.log(por)

    const del = await products.deleteMany({
        'id': null
    });


    for (const coll of Object.values(MONGO.COLLECTION)) {
        const collection = db.collection(coll)
        // List the indexes on the collection and output them as an array
        const result = await collection.listIndexes().toArray()
        // Print the list of indexes
        console.log(`Existing indexes ${coll} :\n`, result)
        console.log('')
    }
    console.log('TERMINO')


}

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
    return result
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
                        _id: {
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
    return result
}

async function gruop() {

}
// db.sales.aggregate([
//     // First Stage
//     {
//         $match: { "date": { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") } }
//     },
//     // Second Stage
//     {
//         $group: {
//             _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//             totalSaleAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
//             averageQuantity: { $avg: "$quantity" },
//             count: { $sum: 1 }
//         }
//     },
//     // Third Stage
//     {
//         $sort: { totalSaleAmount: -1 }
//     }
// ])