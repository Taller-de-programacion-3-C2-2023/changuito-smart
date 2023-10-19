import { FastifyReply, FastifyRequest } from 'fastify'

export const getProducts = (dependencies: any) => {
  const { repository } = dependencies
  const modelName = 'product'
  const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    // const ins = await repository.create({ modelName })
    // console.log(' inset hbler   proaaaductos proaaaductosproaaaductosproaaaductosproaaaductosproaaaductosproaaaductos ')
    const result = await repository.get({ modelName, filter: {} })
    return { product: result }
  }
  return handler
}
