const { config } = require('dotenv');
config();
const { AppDataSource } = require("./data-source");
const express = require("express");
const { configureRoutes } = require('./routesConfig');
const schedule = require('node-schedule');
const cors = require('cors');


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
    app.use(cors());
    app.use(express.json());

    configureRoutes(app);
    
    const port = process.env.PORT || 3009;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    const job = schedule.scheduleJob('08 12 * * *', runScheduledTask);

  })
  .catch((error) => {
    console.error("Error initializing data source:", error);
  });
