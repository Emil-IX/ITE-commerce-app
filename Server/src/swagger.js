import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//There is de suagger options to have  the documentation of this proyect
const options = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "API Backend - E-commerce", 
      version: "1.4.0",                
      description: "API Documentation Swagger by Emil IXs", 
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