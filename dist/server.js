"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("./config/dataSource");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT;
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("✅ Database Connected");
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("❌ Database Connection Failed:", error);
});
