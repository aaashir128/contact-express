const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contact App",
      version: "1.0.0",
      description:
        "This is a API documentation for Contact API's application made with Express and documented with Swagger",
    },
    // Add security definitions
    securityDefinitions: {
      BearerAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    servers: [{ url: "http://localhost:5001/" }],
  },
  // Add security field at the root level
  security: [
    {
      BearerAuth: [],
    },
  ],
  apis: ["./routes/*.js"], // Specify the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
