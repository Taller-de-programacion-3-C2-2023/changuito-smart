import { BranchScrapper } from './branch.js'
import axios from 'axios'
import fs from 'fs'
import { MONGO , SCRAP , THROTTLE_SECS } from './configs.js'

const raw_headers = fs.readFileSync('scrapper-headers.json')
const headers = JSON.parse(raw_headers)

const URL = `${SCRAP.URL_BASE}${SCRAP.PRODUCT_ENDPOINT}`

export class ProductScrapper {
  constructor(db, ui) {
    this.db = db;
    this.ui = ui;
  }

  async getProducts() {
    const scrapper = new BranchScrapper(this.db)
    let branches
    try {
      branches = await scrapper.getBranches()
      console.log("Branches ", branches.length)
    } catch (e) {
      console.log('Failed to query branches: ', e)
      return
    }
    const branchesId = branches.map((b) => b.id)
    const nBranches = branchesId.length;
    this.ui.totalBranches = nBranches;
    let curBranch = 0;
    this.ui.updateBranchCounter(curBranch);
    this.ui.render();
    let products = []
    for (const id of branchesId) {
        await this.scrapBranch(id);
        curBranch++;
        this.ui.updateBranchCounter(curBranch);
        this.ui.render();
    }
    return { success: true, products: products }
  }

  async getProductsForBranch(branchId) {
    const curUrlBase = URL + '&id_sucursal=' + branchId
    const response = await axios.get(curUrlBase, headers)
    const total = response.data.total
    const firstProducts = response.data.productos
    if (firstProducts == undefined) {
      console.warn('Failed to fetch from %s', branchId)
      return {}
    }
    const pageLimit = response.data.maxLimitPermitido

    this.ui.totalProducts = total;
    this.ui.productCounter = 0;
    this.ui.render();
    const products = await this.scrapProducts(pageLimit, total, branchId);

    const totalProductsByBranch = firstProducts.concat(products)
    await this.saveProductsByBranch(branchId, totalProductsByBranch)
    return {
      sucursal: branchId,
      productos: totalProductsByBranch,
      status: 'success',
    }
  }

  async saveProductsByBranch(branchId, products) {
    if (!products.length) return
    const mapped = products.map((prod) => ({
      prices: {
        branchId,
        productId: prod.id,
        date: new Date(),
        price: prod.precio,
      },
      product: {
        id: prod.id,
        name: prod.nombre,
        presentation: prod.presentacion,
        brand: prod.marca,
      },
    }))
    const pricesCollection = this.db.collection(MONGO.COLLECTION.PRICES)
    const prices = mapped.map((x) => x.prices)
    const result = await pricesCollection.insertMany(prices)
    //console.log(`insertados ${prices.length} precios`)

    const productCollection = this.db.collection(MONGO.COLLECTION.PRODUCTS)
    const productsData = mapped.map((x) => x.product)
    const options = { ordered: false }
    const productsDataInserts = await productCollection.insertMany(productsData, options)
    //console.log(`insertados ${productsData.length} produs`)
  }

  async saveProducts(branchProducts) {
    const productsCol = this.db.collection(MONGO.COLLECTION.PRODUCTS)
    return productsCol.insertOne(branchProducts)
  }

  async scrapBranch(id) {
    let throttling = false
    let scrapped = false
    let loops = 0;
    while (!scrapped) {
      try {
        if (throttling) {
          this.ui.updateStatus(`Branch ${id} failed, waiting ${THROTTLE_SECS} secs to retry... (waited ${loops} times)`)
          this.ui.render();
          await new Promise(resolve => setTimeout(resolve, THROTTLE_SECS * 1000));
          loops++;
        }
        const branchProducts = await this.getProductsForBranch(id);
        await this.saveProducts(branchProducts);
        scrapped = true;
      } catch (e) {
        throttling = true;
      }
    }
  }

  async scrapProducts(pageLimit, total, branchId) {
    const resolved = [];
    for (let offset = pageLimit; offset < total; offset += (pageLimit * SCRAP.CONCURRENT_QUERIES)) {
      const promises = []
      for(let i = 0; i < SCRAP.CONCURRENT_QUERIES; i++) {
        const localOffset = offset + pageLimit * i;
        promises.push(this.scrapProductPage(localOffset, pageLimit, branchId))
      }
      resolved.push(... await Promise.all(promises));
    }
    return resolved.flat();
  }

  async scrapProductPage(offset, pageLimit, branchId) {
    const curUrlBase = URL + '&id_sucursal=' + branchId
    const curUrl = curUrlBase + "&offset=" + offset;
    this.ui.render();
    let throttling = false
    let scrapped = false
    let products;
    while (!scrapped) {
      try {
        if (throttling) {
          this.ui.updateStatus(`Throttling ${THROTTLE_SECS} secs...`)
          await new Promise(resolve => setTimeout(resolve, THROTTLE_SECS * 1000));
        }
        const response = await axios.get(curUrl, headers);
        products = response.data.productos;
        this.ui.updateProductCounter(products.length);
        scrapped = true;
      } catch (e) {
        throttling = true;
      }
    }
    return products;
  }
}
