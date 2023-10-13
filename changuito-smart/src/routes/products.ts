import { FastifyReply, FastifyRequest } from 'fastify'

export const getProducts = (dependencies: any) => {
  const { repository } = dependencies
  const modelName = 'product'
  const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const ins = await repository.create({ modelName })
    console.log(' inset habler productos ', ins)
    const result = await repository.get({ modelName, filter: {} })
    console.log(' get habler productos ', result)
    return { product: 'producto' }
  }
  return handler
}
