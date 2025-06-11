import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sua API',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], 
};

export const swaggerSpec = swaggerJSDoc(options);