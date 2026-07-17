import dotenv from "dotenv";

dotenv.config();

const REQUIRED_ENV_VARS = ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DATABASE"] as const;

/**
 * Fails fast with a clear message instead of letting the app boot
 * and crash later on the first DB query with a cryptic pg error.
 */
export function validateEnv(): void {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `❌ Missing required environment variable(s): ${missing.join(", ")}.\n` +
        `  fill in the values in .env.`
    );
    process.exit(1);
  }
}

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  minEmployeeAge: Number(process.env.MIN_EMPLOYEE_AGE) || 18,
  db: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: process.env.DATABASE!,
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",
  },
};
