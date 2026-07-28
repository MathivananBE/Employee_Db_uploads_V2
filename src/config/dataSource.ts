import "reflect-metadata";
import { DataSource } from "typeorm";
import { env, validateEnv } from "./env";
import { EmployeesDetails } from "../entities/Employee"; 
import Leads from "../entities/Leads";
import { Category } from "../entities/categories";
import { SubCategory } from "../entities/subCategory";
import { Project } from "../entities/Project";
import { LeadSource } from "../entities/LeadSource";
import { Department } from "../entities/Department";
import { Designation } from "../entities/Designation";

validateEnv();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: env.db.synchronize,
  logging: env.db.logging,
   entities: [
    EmployeesDetails,
    Leads,
    Category,
    SubCategory,
    Project,
    LeadSource,
    Department,
    Designation
  ],
  migrations: [__dirname + "/../migrations/*.{ts,js}"],
  subscribers: [],
});

export default AppDataSource;
