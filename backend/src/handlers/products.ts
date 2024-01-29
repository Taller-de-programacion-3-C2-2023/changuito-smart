import { FastifyReply, FastifyRequest } from 'fastify'
import { paginationDefaults } from '../config'

export const ProductHandler = (dependencies: any) => {
  const { product: productRepository } = dependencies

  const getProducts = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { name, offset, limit } = request.query
    const pagination = { ...paginationDefaults, ...(offset && { offset }), ...(limit && { limit }) }

    const result = await productRepository.findByName(name, pagination)
    return result
  }

  return {
    get: getProducts,
  }
}
