import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//There is de suagger options to have  the documentation of this proyect
const options = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "API Backend - E-comerce", 
      version: "1.0.0",                
      description: "Documentación de la API con Swagger", 
    },
    servers: [
      {
        url: "http://localhost:3000/api", // base URL
      },
    ],
     components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], //   where to find JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };