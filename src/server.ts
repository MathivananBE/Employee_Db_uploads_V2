import { AppDataSource } from "./config/dataSource";
import app from "./app"

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database Connection Failed:", error);
  });