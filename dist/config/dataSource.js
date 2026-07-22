"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
const Employee_1 = require("../entities/Employee");
const Leads_1 = __importDefault(require("../entities/Leads"));
const categories_1 = require("../entities/categories");
const subCategory_1 = require("../entities/subCategory");
(0, env_1.validateEnv)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: env_1.env.db.host,
    port: env_1.env.db.port,
    username: env_1.env.db.username,
    password: env_1.env.db.password,
    database: env_1.env.db.database,
    synchronize: env_1.env.db.synchronize,
    logging: env_1.env.db.logging,
    entities: [
        Employee_1.EmployeesDetails,
        Leads_1.default,
        categories_1.Category,
        subCategory_1.SubCategory
    ],
    migrations: [__dirname + "/../migrations/*.{ts,js}"],
    subscribers: [],
});
exports.default = exports.AppDataSource;
