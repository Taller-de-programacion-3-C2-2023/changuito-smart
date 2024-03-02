import { FastifyReply, FastifyRequest } from 'fastify'

export const PriceRecordHandler = (dependencies: any) => {
  const { price: priceRepository } = dependencies

  const getPriceRecords = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { products, fromDate, toDate } = request.query

    return await priceRepository.findByDateRange({ products, fromDate, toDate })
  }

  return {
    get: getPriceRecords,
  }
}
