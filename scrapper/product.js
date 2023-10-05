import {BranchScrapper} from './branch.js';
import axios from 'axios';
import fs from 'fs';

const raw_headers = fs.readFileSync('scrapper-headers.json');
const headers = JSON.parse(raw_headers);

const URL="https://d3e6htiiul5ek9.cloudfront.net/prod/productos?limit=100"

export class ProductScrapper {
	async getProducts() {
		const scrapper = new BranchScrapper();
		try {
			const branches = await scrapper.getBranches();
		} catch (e) {
			console.log("Failed to query branches");
			return;
		}
		const branchesId = branches.map(b => b.id);
		for (const id of branchesId) {
			const branchProducts = this.getProductsForSucursal(id);
			products = products.append(branchProducts);
		}
		return products;
	}

	async getProductsForSucursal(idSucursal) {
		const curUrlBase = URL + "&id_sucursal=" + idSucursal;
		const response = await axios.get(curUrlBase, headers);
		const total = response.data.total;
		const firstProducts = response.data.productos;
		if (firstProducts == undefined) {
			console.warn("Failed to fetch from %s", idSucursal);
			return {}
		}
		const pageLimit = response.data.maxLimitPermitido;

		const promises = [];
		for (let offset = pageLimit; offset < total; offset += pageLimit) {
			const curUrl = URL + "&offset=" + offset;
			try {
				promises.push(axios.get(curUrl, headers));
			} catch (e) {
				console.log("Failed at ", offset);
			}
		}

		const resolved = Promise.all(promises);
		const products = resolved.map(response => response.data.productos).flat();
		return {"sucursal": idSucursal, "productos": firstProducts.concat(products), status: "success"};
	}
}
