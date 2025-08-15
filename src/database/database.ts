import "reflect-metadata";
import { AppDataSource } from "../config/database.config";

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");

    // Skip migrations in production if database already has schema
    // You can enable this by setting RUN_MIGRATIONS=true in environment variables
    if (
      process.env.NODE_ENV === "production" &&
      process.env.RUN_MIGRATIONS === "true"
    ) {
      try {
        console.log("Running database migrations...");
        await AppDataSource.runMigrations();
        console.log("Database migrations completed");
      } catch (migrationError: any) {
        console.warn(
          "Migration warning (this might be normal if database already exists):",
          migrationError?.message
        );
        // Check if it's just a "already exists" error, if so, continue
        if (
          migrationError?.message?.includes("already exists") ||
          migrationError?.code === "42710"
        ) {
          console.log("Database schema already exists, continuing...");
        } else {
          // If it's a different error, we should still fail
          throw migrationError;
        }
      }
    } else if (process.env.NODE_ENV === "production") {
      console.log(
        "Skipping migrations in production (database schema assumed to exist)"
      );
    }
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
