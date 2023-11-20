import { FastifyReply, FastifyRequest } from 'fastify'
import { locationDefault, paginationDefaults } from '../config'

export const CartHandler = (dependencies: any) => {
  const { price: priceRepository, branch: branchRepository } = dependencies

  const getCarts = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { products, location, limit, offset } = request.query
    const { lon, lat } = location ?? locationDefault
    const pagination = { ...paginationDefaults, ...(offset && { offset }), ...(limit && { limit }) }
    const branches = await branchRepository.findByLocation(lon, lat, pagination)
    const branchesId = branches.map((x) => x.id)
    console.log(branchesId)
    const result = await priceRepository.findByCart({ products, branches: branchesId })
    console.log(result)
    return result
  }

  return {
    get: getCarts,
  }
}
