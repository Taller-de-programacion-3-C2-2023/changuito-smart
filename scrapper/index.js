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

        const statusCol = db.collection("status");
        const query = { };
        const update = { $set: { status: "Started" }};
        const options = { upsert: true };
        await statusCol.updateOne(query, update, options);

        const branchScrapper = new BranchScrapper(db);
        const branches = await branchScrapper.getBranches();

        const productScrapper = new ProductScrapper(db);
        const products = await productScrapper.getProducts();
        if (products.success) {
            console.info("Product scrapping finished");
        } else {
            console.warn("Scrapping interrupted at branch %s", products.lastId);
        }
        const data = await statusCol.find().toArray();
    } catch (e) {
        console.error("Scrapper finished with error:", e);
    } finally {
        await client.close();
    }
}

main()
