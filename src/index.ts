import { AppDataSource } from "./data-source";
import * as express from "express";
import { configureRoutes } from './routesConfig';
import * as schedule from 'node-schedule';

import stadiumController from "./controller/StadiumController";

async function runScheduledTask() {
  console.log("skn");
  
  try {    
    await stadiumController.updateTimeSlotStadiums();
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
}

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());
    

   


    configureRoutes(app);
    
    const port = process.env.PORT || 3009;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    const job = schedule.scheduleJob('33 13 * * *', runScheduledTask);

  })
  .catch((error) => {
    console.error("Error initializing data source:", error);
  });
