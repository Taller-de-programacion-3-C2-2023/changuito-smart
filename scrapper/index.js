import {BranchScrapper} from './branch.js';

async function main() {
	const scrapper = new BranchScrapper();
	const branches = await scrapper.getBranches();
}

main()
