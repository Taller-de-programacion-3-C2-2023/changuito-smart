import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { Repositories } from '../repository'

export default fp(async (fastify: FastifyInstance, opts: any) => {
  //@ts-ignore
  const { mongo } = fastify
  fastify.decorate('Repositories', Repositories(mongo.client))
})
