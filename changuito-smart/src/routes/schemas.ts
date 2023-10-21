export const getProductsSchema = {
  //todo: schema to define
  // request needs to have a querystring with a `name` parameter
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
  // the response needs to be an object with an `hello` property of type 'string'
  response: {
    200: {
      type: 'object',
      properties: {
        hello: { type: 'string' },
      },
    },
  },
}
