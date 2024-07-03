import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Stadium } from "../entity/Stadium";
import { TimeSlot } from "../entity/TimeSlot";
export class TimeSlotsController {
  private userRepository = AppDataSource.getRepository(User);
  private stadiumRepository = AppDataSource.getRepository(Stadium);
  private timeSlotRepository = AppDataSource.getRepository(TimeSlot);

  async getAllTimeSlots(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {  
      const allTimeSlots = await this.timeSlotRepository
        .createQueryBuilder("timeSlots")
        .leftJoinAndSelect("timeSlots.team", "user")
        .leftJoinAndSelect("timeSlots.stadium", "stadium")
        .getMany();

  
      response.send({
        count: allTimeSlots.length,
        data: allTimeSlots,
      });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }
  

  async getOneTimeSlot(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      const oneTimSlot = await this.timeSlotRepository
        .createQueryBuilder("timeSlot")
        .leftJoinAndSelect("timeSlot.team", "user")
        .leftJoinAndSelect("timeSlot.stadium", "stadium")
        .leftJoinAndSelect("stadium.field", "field")
        .where("timeSlot.id = :id", { id })
        .getOne();

      if (!oneTimSlot) {
        response.send({
          success: false,
          message: "timeSlot not found !",
        });
      } else {
        response.send({ data: oneTimSlot });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  async updateTimeSlot (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);
      const {stadiumId, day, startTime, endTime } = request.body;


      let timeSlotToUpdate = await this.timeSlotRepository.findOneBy({ id });
      let stadiumToUpdate = await this.stadiumRepository.findOneBy({ id:stadiumId });

      if (!timeSlotToUpdate || !stadiumToUpdate) {
        return response.status(400).json({
          error: "user or stadium not found!!",
        });
      } else {
        timeSlotToUpdate.stadium = stadiumToUpdate;
        timeSlotToUpdate.day = day;
        timeSlotToUpdate.startTime = startTime;
        timeSlotToUpdate.endTime = endTime;
       

        return this.timeSlotRepository.save(timeSlotToUpdate);
      }
    } catch (error) {
      Error(error);
      response.status(500).send(error);
    }
  }

  async createTimeSlot(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const {stadiumId, day, startTime, endTime } = request.body;
      const stadium = await this.stadiumRepository.findOneBy(stadiumId);

      if (!stadium ) {
        
        response.send({
          success: false,
          message: "This stadium and team does not exist in the database!",
        });
      } else {
        const newTimeSlot: any = {
          day,
          startTime,
          endTime,
          stadium: { id: stadiumId }, // Assuming fieldId is passed in the request body
          /* Add other fields as needed */
        };

        return this.timeSlotRepository.save(newTimeSlot);
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }


  async deleteTimeSlot(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const id = parseInt(request.params.id);

		let timeSlotToRemove = await this.timeSlotRepository.findOneBy({ id });

		if (!timeSlotToRemove) {
			response.send({
				success: false,
				message: "timeSlot not found.",
			});
		} else {
			return this.timeSlotRepository.remove(timeSlotToRemove);
		}
	}

}
