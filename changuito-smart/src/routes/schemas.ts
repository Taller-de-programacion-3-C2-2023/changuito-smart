export const getProductsSchema = {
  //todo: schema to define
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    // required: ['name'],
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

export const getPricesSchema = {
  querystring: {
    type: 'object',
    properties: {
      products: { type: 'array', default: [], items: { type: 'string' } },
      branches: { type: 'array', items: { type: 'string' } },
      date: { type: 'string' },
      offset: { type: 'number' },
      limit: { type: 'number' },
    },
    required: ['products'],
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
      lon: { type: 'number' },
      offset: { type: 'number' },
      limit: { type: 'number' },
    },
    required: [],
  },
}

export const postBranchesSearchSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
}

export const getCartSchema = {
  querystring: {
    type: 'object',
    properties: {
      products: { type: 'array', default: [], items: { type: 'string' } },
      location: {
        type: 'object',
        // TODO si locacion entonces ambos obligatorios
        properties: {
          lat: { type: 'number' },
          lon: { type: 'number' },
        },
      },
      offset: { type: 'number' },
      limit: { type: 'number' },
    },
    required: ['products'],
  },
}
