import cors from "cors";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { corsOrigin } from "./config/env";
import { swaggerSpec } from "./config/swagger";
import { apiRateLimiter } from "./shared/middlewares/rate-limit";
import { errorHandler } from "./shared/middlewares/error-handler";
import { notFoundHandler } from "./shared/middlewares/not-found";
import { sanitizeInput } from "./shared/middlewares/sanitize-input";
import { sendSuccess } from "./shared/utils/api-response";
import apiRoutes from "./routes";

const app = express();

app.use(helmet());
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());
app.use(sanitizeInput);
app.use(apiRateLimiter);

app.get("/", (_req, res) => {
  return sendSuccess(res, { name: "Oldschool Agency Ops API" }, "API Running");
});

app.get("/health", (_req, res) => {
  return sendSuccess(res, { status: "ok" });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
