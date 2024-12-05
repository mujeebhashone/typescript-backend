import app from "./app";
import connectDatabase from "./config/database";
import logger from "./utils/logger";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
