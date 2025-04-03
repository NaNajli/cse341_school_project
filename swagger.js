const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'School API',
        description: 'API for control school infos'
    },
    host: 'cse341-school-project.onrender.com',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);