import { FastifyReply, FastifyRequest } from 'fastify'

export const PriceHandler = (dependencies: any) => {
  const { price: priceRepository } = dependencies

  const getPrices = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { products } = request.query

    const result = await priceRepository.findBy({ products })
    return result
  }

  return {
    get: getPrices,
  }
}
