import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Stadium } from "../entity/Stadium";
import { TimeSlot } from "../entity/TimeSlot";
export class StadiumController {
  private stadiumRepository = AppDataSource.getRepository(Stadium);
  private timeSlotRepositroy=  AppDataSource.getRepository(TimeSlot);

  async getAllStadiums(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      console.log("lzdjh");
      
      const allStadiums = await this.stadiumRepository
        .createQueryBuilder("stadium")
        .leftJoinAndSelect("stadium.field", "field")
        .leftJoinAndSelect("stadium.timeSlots", "timeSlot")
        .leftJoinAndSelect("timeSlot.team", "user")
        .getMany();

      response.send({
        count: allStadiums.length,
        data: allStadiums,
      });
    } catch (error) {
      Error(error);
      response.status(500).send(error);
    }
  }

  async updateTimeSlotStadiums() {
    try {      
      const allStadiums = await this.stadiumRepository
        .createQueryBuilder("stadium")
        .leftJoinAndSelect("stadium.field", "field")
        .leftJoinAndSelect("stadium.timeSlots", "timeSlot")
        .leftJoinAndSelect("timeSlot.team", "user")
        .getMany();
      
        for (const stadium of allStadiums) {
          for (const timeSlot of stadium.timeSlots) {
            const timeOfEndingGame = timeSlot.endTime.getDay();
            const now = new Date();
            const currentTime = now.getDay();
  
            if ( currentTime- timeOfEndingGame> 0) {
              timeSlot.startTime.setDate(timeSlot.startTime.getDate() + 7);
              timeSlot.endTime.setDate(timeSlot.endTime.getDate() + 7);  
              let TimeSlotRecreate = await this.timeSlotRepositroy.findOneBy({ id: timeSlot.id });
              await this.timeSlotRepositroy.remove(TimeSlotRecreate);
  
              const newTimeSlot: any = {
                day: timeSlot.day,
                startTime: timeSlot.startTime,
                endTime: timeSlot.endTime,
                stadium: { id: stadium.id },
              };
  
              await this.timeSlotRepositroy.save(newTimeSlot);
            }
          }
        }


    } catch (error) {
      Error(error);
    }
  }
  async getOneStadium(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);

      const oneStadium = await this.stadiumRepository
        .createQueryBuilder("stadium")
        .leftJoinAndSelect("stadium.field", "field")
        .leftJoinAndSelect("stadium.timeSlots", "timeSlot")
        .leftJoinAndSelect("timeSlot.team", "user")
        .where("stadium.id = :id", { id })
        .getOne();

      if (!oneStadium) {
        response.send({
          success: false,
          message: "Cet stadium n'existe pas !",
        });
      } else {

        response.send({ data: oneStadium});
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  async createStadium(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const {
        stadiumName,
        fieldId,
        capacity,
        price,
        numberOfCourts,
        numberOfHoops,
        imageURL,
        longitude,
        latitude,
        status,
        Region,
        isFree,
        isInDoor,
        hasLighting,
        hasShower,
      } = request.body;

      const stadium = await this.stadiumRepository.findOne({
        where: { stadiumName },
      });

      if (stadium) {
        response.send({
          success: false,
          message: "This stadium already exists in the database!",
        });
      } else {
        const newStadium: any = {
          stadiumName,
          field: { id: fieldId },
          capacity,
          price,
          numberOfCourts,
          numberOfHoops,
          imageURL,
          longitude,
          latitude,
          status,
          Region,
          isFree,
          isInDoor,
          hasLighting,
          hasShower, // Assuming fieldId is passed in the request body
          /* Add other fields as needed */
        };

        return this.stadiumRepository.save(newStadium);
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }


}

export default new StadiumController();
