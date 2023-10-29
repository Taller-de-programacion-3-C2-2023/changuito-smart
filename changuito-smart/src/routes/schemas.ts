export const getProductsSchema = {
  //todo: schema to define
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
  // response: {
  //   200: {
  //     type: 'object',
  //     properties: {
  //       hello: { type: 'string' },
  //     },
  //   },
  // },
}

export const getBranchesSchema = {
  querystring: {
    type: 'object',
    properties: {
      sucursalNombre: { type: 'string' },
      lat: { type: 'number' },
      lng: { type: 'number' },
    },
    required: [],
  },
}
