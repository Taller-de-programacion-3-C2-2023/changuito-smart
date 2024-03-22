export const getProductsSchema = {
  summary: 'Búsquedas de productos por nombre',
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    // required: ['name'],
  },
}

export const getPricesSchema = {
  summary: 'Búsqueda de precios de los productos dada una lista de sucursales',
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

export const getPriceRecordsSchema = {
  summary: 'Evolución histórica de precios de uno o varios productos',
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
  summary: 'Búsqueda de sucursales de supermercado cercanas a una ubicación geográfica',
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
  summary: "Consulta de precios de una lista de productos",
  querystring: {
    type: 'object',
    properties: {
      products: { type: 'array', default: [], items: { type: 'string' }, examples: [['8445290848956']]},
      lat: { type: 'number', examples: [-34.60] },
      lon: { type: 'number', examples: [-58.39] },
      offset: { type: 'number' },
      limit: { type: 'number' },
    },
    required: ['products'],
  },
  response: {
    200: {
      type: 'array',
      examples: [
        [
        {
          "_id": "10-2-189",
          "cartPrice": 1070,
          "cartLength": 1,
          "cartProducts": [
            {
              "productId": "8445290848956",
              "price": 1070
            }
          ],
          "branch": {
            "_id": "65e380c0cab98c0aa95227da",
            "banderaId": 2,
            "sucursalNombre": "Av. Corrientes",
            "id": "10-2-189",
            "sucursalTipo": "Supermercado",
            "provincia": "AR-C",
            "direccion": "Av. Corrientes 1160",
            "banderaDescripcion": "Market",
            "localidad": "Ciudad Autónoma de Buenos Aires",
            "comercioRazonSocial": "INC S.A.",
            "comercioId": 10,
            "sucursalId": "189",
            "location": {
              "type": "Point",
              "coordinates": [
                -58.383077,
                -34.603902
              ]
            },
            "dist": {
              "calculated": 768.8080586513693,
              "location": {
                "type": "Point",
                "coordinates": [
                  -58.383077,
                  -34.603902
                ]
              }
            }
          }
        },
        {
          "_id": "10-3-357",
          "cartPrice": 1020,
          "cartLength": 1,
          "cartProducts": [
            {
              "productId": "8445290848956",
              "price": 1020
            }
          ],
          "branch": {
            "_id": "65e380c0cab98c0aa95228d6",
            "banderaId": 3,
            "sucursalNombre": "Sarmiento 1592",
            "id": "10-3-357",
            "sucursalTipo": "Autoservicio",
            "provincia": "AR-C",
            "direccion": "Sarmiento 1592",
            "banderaDescripcion": "Express",
            "localidad": "Ciudad Autónoma de Buenos Aires",
            "comercioRazonSocial": "INC S.A.",
            "comercioId": 10,
            "sucursalId": "357",
            "location": {
              "type": "Point",
              "coordinates": [
                -58.38923,
                -34.605506
              ]
            },
            "dist": {
              "calculated": 616.9688774576595,
              "location": {
                "type": "Point",
                "coordinates": [
                  -58.38923,
                  -34.605506
                ]
              }
            }
          }
        }
        ]
      ]
    }
  }
}

export const getLastScrapDateSchema = {
  summary: "Consulta de ultima fecha de obtención de datos",
  response: {
  200: {
     type: 'string',
     examples: ['2024-03-22'],
   },
  }
}
