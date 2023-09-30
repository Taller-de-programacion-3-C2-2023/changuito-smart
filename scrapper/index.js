import {BranchScrapper} from './branch.js';
import {ProductScrapper} from './product.js';

async function main() {
	const branchScrapper = new BranchScrapper();
	const branches = await branchScrapper.getBranches();
	const productScrapper = new ProductScrapper();
	const products = await productScrapper.getProducts();
}

main()
