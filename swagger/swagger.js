const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoHeaders: false,
});

const doc = {
  info: {
    title: "Circle",
    description: "API Documentation",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
    },
    {
      url: "https://circle.vercel.app",
    },
    {
      url: "https://circle-staging.vercel.app",
    },
  ],
  components: {
    "@schemas": {
      registerDTO: {
        type: "object",
        properties: {
          fullName: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
        required: ["fullName", "email", "password"],
      },
      loginDTO: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            description: "with no swagger auto gen",
          },
          password: {
            type: "string",
            format: "password",
            description: "with no swagger auto gen",
          },
        },
        required: ["email", "password"],
      },
    },
    host: "localhost:3000/api/v1",
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["src/version/v1.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
