import { config } from 'dotenv';
config();
import { AppDataSource } from "./data-source";
import * as express from "express";
import { configureRoutes } from './routesConfig';
import * as schedule from 'node-schedule';
import * as cors from 'cors';

import stadiumController from "./controller/StadiumController";

async function runScheduledTask() {
  console.log("eeeee");
  try {    
    await stadiumController.updateTimeSlotStadiums();
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
}

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    configureRoutes(app);
    
    const port = process.env.PORT || 3009;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    const job = schedule.scheduleJob('19 22 * * *', runScheduledTask);

  })
  .catch((error) => {
    console.error("Error initializing data source:", error);
  });
