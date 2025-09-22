const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Video Games API',
    description: 'API for managing video games and users'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles =  ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
