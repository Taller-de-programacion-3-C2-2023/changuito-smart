import { FastifyReply, FastifyRequest } from 'fastify'
import { paginationDefaults } from '../config'

export const BranchHandler = (dependencies: any) => {
  const { branch: branchRepository } = dependencies

  const getBranches = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { lon, lat, offset, limit } = request.query
    // si el offset o el limit no se envian se toman los valores por defaut
    const pagination = { ...paginationDefaults, ...(offset && { offset }), ...(limit && { limit }) }

    const result = await branchRepository.findByLocation(lon, lat, pagination)
    return result
  }

  const postSearch = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { name } = request.body
    const result = await branchRepository
    return { bodyName: name }
  }

  return {
    get: getBranches,
    postSearch: postSearch,
  }
}
