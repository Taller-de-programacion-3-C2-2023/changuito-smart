// import { getProducts } from './products'
import { FastifyReply, FastifyRequest } from 'fastify'

// export class ProductHandler {
//   private productRepository

//   constructor(dependencies) {
//     this.productRepository = dependencies.repository
//   }

//   public async get(request: FastifyRequest, _reply: FastifyReply) {
//     //@ts-ignore
//     const { name } = request.query
//     const result = await this.productRepository.findByName(name)
//     return { product: result }
//   }
// }

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
