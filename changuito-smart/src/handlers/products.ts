import { FastifyReply, FastifyRequest } from 'fastify'

export const ProductHandler = (dependencies: any) => {
  const { product: productRepository } = dependencies

  const getProducts = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { name } = request.query
    const result = await productRepository.findByName(name)
    return result
  }

  return {
    get: getProducts,
  }
}
