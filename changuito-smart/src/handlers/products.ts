import { FastifyReply, FastifyRequest } from 'fastify'

export const getProducts = (dependencies: any) => {
  const { repository } = dependencies
  const modelName = 'products'
  const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await repository.get({ modelName, filter: {} })
    return { product: result }
  }
  return handler
}
