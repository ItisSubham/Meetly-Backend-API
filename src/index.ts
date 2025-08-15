import "dotenv/config";
import "./config/passport.config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "./config/app.config";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middeware";
import { BadRequestException } from "./utils/app-error";
import { initializeDatabase } from "./database/database";
import authRoutes from "./routes/auth.route";
import passport from "passport";
import eventRoutes from "./routes/event.route";
import availabilityRoutes from "./routes/availability.route";
import integrationRoutes from "./routes/integration.route";
import meetingRoutes from "./routes/meeting.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Meetly Backend API is running successfully!",
      status: "healthy",
      environment: config.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/event`, eventRoutes);
app.use(`${BASE_PATH}/availability`, availabilityRoutes);
app.use(`${BASE_PATH}/integration`, integrationRoutes);
app.use(`${BASE_PATH}/meeting`, meetingRoutes);

app.use(errorHandler);

const server = app.listen(config.PORT, async () => {
  await initializeDatabase();
  console.log(`🚀 Server listening on port ${config.PORT} in ${config.NODE_ENV} mode`);
  console.log(`📊 Health check available at: http://localhost:${config.PORT}/`);
  console.log(`🔗 API base path: ${config.BASE_PATH}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
