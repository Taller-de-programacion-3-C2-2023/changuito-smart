import { FastifyReply, FastifyRequest } from 'fastify'

export const PriceRecordHandler = (dependencies: any) => {
  const { price: priceRepository } = dependencies

  const getPriceRecords = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { products } = request.query

    const result = [
      {
        product: 1,
        prices: [
          { price: 100, date: new Date('2024-01-02') },
          { price: 108, date: new Date('2024-01-05') },
          { price: 118, date: new Date('2024-01-07') },
          { price: 128, date: new Date('2024-01-09') },
          { price: 140, date: new Date('2024-01-12') },
        ],
      },
      {
        product: 2,
        prices: [
          { price: 200, date: new Date('2024-01-02') },
          { price: 220, date: new Date('2024-01-05') },
          { price: 280, date: new Date('2024-01-12') },
          { price: 280, date: new Date('2024-01-15') },
          { price: 350, date: new Date('2024-01-20') },
        ],
      },
    ]
    return result
  }

  return {
    get: getPriceRecords,
  }
}
