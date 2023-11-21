import { BranchScrapper } from './branch.js'
import axios from 'axios'
import fs from 'fs'
import { URL_SCRAP as URL, MONGO } from './configs.js'

const raw_headers = fs.readFileSync('scrapper-headers.json')
const headers = JSON.parse(raw_headers)

export class ProductScrapper {
  constructor(db) {
    this.db = db
  }

  async getProducts() {
    const scrapper = new BranchScrapper(this.db)
    let branches
    try {
      branches = await scrapper.getBranches()
    } catch (e) {
      console.log('Failed to query branches: ', e)
      return
    }
    const branchesId = branches.map((b) => b.id)
    let products = []
    for (const id of branchesId) {
      try {
        const branchProducts = await this.getProductsForBranch(id)
        // await this.saveProducts(branchProducts);
        // products.push(branchProducts);
      } catch (e) {
        console.info('Failed while scrapping branch with id', id, e)
        return { success: false, lastId: id }
      }
    }
    return { success: true, products: products }
  }

  async saveProducts(branchProducts) {
    const productsCol = this.db.collection(MONGO.COLLECTION.PRODUCTS)
    return productsCol.insertOne(branchProducts)
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

    const promises = []
    for (let offset = pageLimit; offset < total; offset += pageLimit) {
      const curUrl = curUrlBase + '&offset=' + offset
      promises.push(axios.get(curUrl, headers))
    }

    const resolved = await Promise.all(promises)
    const products = resolved.map((response) => response.data.productos).flat()
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
        presntation: prod.presentacion,
        brand: prod.marca,
      },
    }))
    const pricesCollection = this.db.collection(MONGO.COLLECTION.PRICES)
    const prices = mapped.map((x) => x.prices)
    const result = await pricesCollection.insertMany(prices)
    console.log(`insertados ${prices.length} precios`)

    const productCollection = this.db.collection(MONGO.COLLECTION.PRODUCTS)
    const productsData = mapped.map((x) => x.product)
    const options = { ordered: false }
    const productsDataInserts = await productCollection.insertMany(productsData, options)
    console.log(`insertados ${productsData.length} produs`)
  }
}
