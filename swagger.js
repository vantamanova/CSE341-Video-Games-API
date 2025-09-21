const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Video Games API',
    description: 'API for managing video games and users'
  },
  host: 'cse341-video-games-api.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles =  ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
