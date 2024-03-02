import { FastifyReply, FastifyRequest } from 'fastify'
import { locationDefault, paginationDefaults } from '../config'

export const CartHandler = (dependencies: any) => {
  const { price: priceRepository, branch: branchRepository } = dependencies

  const getCarts = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { products, location, limit, offset } = request.query
    const productsNum = products.map(p => Number(p));
    const { lon, lat } = location ?? locationDefault
    // si el offset o el limit no se envian se toman los valores por defaut
    const pagination = { ...paginationDefaults, ...(offset && { offset }), ...(limit && { limit }) }

    const branches = await branchRepository.findByLocation(lon, lat, pagination)
    const branchesById = branches.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {})
    const result = await priceRepository.findByCart({ products: productsNum, branches: Object.keys(branchesById) })
    return result.map((x) => ({ ...x, branch: branchesById[x._id] }))
  }

  return {
    get: getCarts,
  }
}
