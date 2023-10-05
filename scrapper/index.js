import {BranchScrapper} from './branch.js';
import {ProductScrapper} from './product.js';
import {MongoClient} from 'mongodb';

// TODO: move to env config
// TODO: ip should be assigned by DNS 
const MONGO_URI = "mongodb://changuito:smart@172.18.0.3:27017/"

async function main() {
    const client = new MongoClient(MONGO_URI);

    try {
        console.log("Starting...");
        await client.connect();
        const db = client.db("scrapper");

        const branchScrapper = new BranchScrapper(db);
        console.log("Getting branches...");
        const branches = await branchScrapper.getBranches();

        console.log(branches);
        console.log(branches.slice(0,2));

        const productScrapper = new ProductScrapper();
        //const products = await productScrapper.getProducts();
        const statusCol = db.collection("status");
        const data = await statusCol.find().toArray();
        const query = { };
        const update = { $set: { status: "Started" }};
        const options = { upsert: true };
        await statusCol.updateOne(query, update, options);
        console.log("Data: ", data);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main()
