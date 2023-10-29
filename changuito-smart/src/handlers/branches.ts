import { FastifyReply, FastifyRequest } from 'fastify'

export const BranchHandler = (dependencies: any) => {
  const { branch: branchRepository } = dependencies

  const getBranches = async (request: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { lon, lat } = request.query
    const result = await branchRepository.findByLocation(lon, lat)
    return result
  }

  return {
    get: getBranches,
  }
}
