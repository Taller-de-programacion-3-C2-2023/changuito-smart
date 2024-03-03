import { FastifyReply, FastifyRequest } from 'fastify'
import { locationDefault, paginationDefaults } from '../config'

export const CartHandler = (dependencies: any) => {
  const { price: priceRepository, branch: branchRepository } = dependencies

  const getCarts = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { products, lon, lat, limit, offset } = request.query
    let safeLon = Number(lon) || locationDefault.lon;
    let safeLat = Number(lat) || locationDefault.lat;
    // si el offset o el limit no se envian se toman los valores por defaut
    const pagination = { ...paginationDefaults, ...(offset && { offset }), ...(limit && { limit }) }

    const branches = await branchRepository.findByLocation(safeLon, safeLat, pagination)
    const branchesById = branches.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {})
    const result = await priceRepository.findByCart({ products, branches: Object.keys(branchesById), lat, lon })
    return result.map((x) => ({ ...x, branch: branchesById[x._id] }))
  }

  return {
    get: getCarts,
  }
}
