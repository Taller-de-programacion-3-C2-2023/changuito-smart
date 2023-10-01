import axios from 'axios';
import fs from 'fs';

const raw_headers = fs.readFileSync('scrapper-headers.json');
const headers = JSON.parse(raw_headers);

const URL="https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?limit=30"

export class BranchScrapper {
	async getBranches() {
		const response = await axios.get(URL, headers);
		const total = response.data.total;
		const firstBranches = response.data.sucursales;
		const pageLimit = response.data.totalPagina;

		const promises = [];
		for (let offset = pageLimit; offset < total; offset += pageLimit) {
			const curUrl = URL + "&offset=" + offset
			promises.push(axios.get(curUrl, headers));
		}

		const resolved = await Promise.all(promises);
		const branches = resolved.map(response => response.data.sucursales).flat();
		return firstBranches.concat(branches);
	}
}
