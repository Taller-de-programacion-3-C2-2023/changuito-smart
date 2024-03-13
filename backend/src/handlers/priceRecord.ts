import { FastifyReply, FastifyRequest } from 'fastify'

export const PriceRecordHandler = (dependencies: any) => {
  const { price: priceRepository } = dependencies

  const getPriceRecords = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { products, from, to } = request.query;

    return await priceRepository.findByDateRange(
      { products, fromDate: new Date(from), toDate: new Date(to) })
  }

  const getLastScrapDate = async (request: FastifyRequest, reply: FastifyReply) => {
    return await priceRepository.getLastScrapDate();
  }

  return {
    get: getPriceRecords,
    getLastScrapDate,
  }
}
