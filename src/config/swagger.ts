import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./env";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Oldschool Agency Ops API",
      version: "1.0.0",
      description: "Production-ready modular Express API with Prisma, JWT, Zod, and OpenAPI.",
    },
    servers: [
      {
        url: env.API_BASE_URL,
        description: "Configured API server",
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
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Validation failed." },
            errors: { type: "array", items: { type: "object" } },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Success" },
            data: { type: "object" },
          },
        },
      },
    },
  },
  apis: [
    "./src/modules/**/*.docs.ts",
    "./src/modules/**/*.schema.ts",
    "./src/routes/**/*.ts",
  ],
});
