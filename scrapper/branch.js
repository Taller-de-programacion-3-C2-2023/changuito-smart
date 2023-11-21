import axios from 'axios'
import fs from 'fs'
import { SCRAP, MONGO } from './configs.js'

const raw_headers = fs.readFileSync('scrapper-headers.json')
const headers = JSON.parse(raw_headers)

const URL = `${SCRAP.URL_BASE}${SCRAP.BRANCH_ENDPOINT}`

export class BranchScrapper {
  constructor(db) {
    this.db = db
  }

  async getBranches() {
    console.log('Getting branches...')
    const branchCol = this.db.collection(MONGO.COLLECTION.BRANCHES)
    const dbCount = await branchCol.count()
    let remoteCount = 0
    try {
      remoteCount = await this.countRemoteBranches()
    } catch (e) {
      console.warn('Failed to count current branches')
    }

    console.log('DB count: ', dbCount, 'Remote Count:', remoteCount)
    if (dbCount == 0) {
      const branches = await this.getRemoteBranches()
      console.log('Adding ', branches.length, ' branches')
      await branchCol.deleteMany({})
      await branchCol.insertMany(branches)
      await branchCol.createIndex({ location: '2dsphere' })
      return branches
    } else {
      console.log('Branches already exist')
      return this.getLocalBranches(branchCol)
    }
  }

  async countRemoteBranches() {
    const response = await axios.get(URL, headers)
    return response.data.total
  }

  async getLocalBranches(branchCol) {
    return branchCol.find().toArray()
  }

  async getRemoteBranches() {
    const response = await axios.get(URL, headers)
    const total = response.data.total
    const firstBranches = response.data.sucursales
    const pageLimit = response.data.totalPagina

    const promises = []
    for (let offset = pageLimit; offset < total; offset += pageLimit) {
      const curUrl = URL + '&offset=' + offset
      promises.push(axios.get(curUrl, headers))
    }

    const resolved = await Promise.all(promises)
    const branches = resolved.map((response) => response.data.sucursales).flat()
    const remoteBranches = firstBranches.concat(branches)
    remoteBranches.forEach(fixBranchLocation)
    return remoteBranches
  }
}

function fixBranchLocation(branch) {
  branch.location = {
    type: 'Point',
    coordinates: [Number(branch.lng), Number(branch.lat)],
  }
  delete branch.lat
  delete branch.lng
}
