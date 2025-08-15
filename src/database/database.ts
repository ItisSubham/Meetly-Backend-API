import "reflect-metadata";
import { AppDataSource } from "../config/database.config";

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
    
    // Run migrations in production
    if (process.env.NODE_ENV === "production") {
      console.log("Running database migrations...");
      await AppDataSource.runMigrations();
      console.log("Database migrations completed");
    }
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
