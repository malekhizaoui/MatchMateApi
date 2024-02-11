import { AppDataSource } from "./data-source";
import authRouter from "./routes";
import * as express from "express";
import { configureRoutes } from './routesConfig';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());
    
    configureRoutes(app);

    const port = process.env.PORT || 3009;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error initializing data source:", error);
  });
