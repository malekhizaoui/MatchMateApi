import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Stadium } from "../entity/Stadium";
import { TimeSlot } from "../entity/TimeSlot";
import { ImageStadium } from "../entity/ImageStadium";
import { GameHistory } from "../entity/GameHistory";
import { User } from "../entity/User";
export class StadiumController {
  private stadiumRepository = AppDataSource.getRepository(Stadium);
  private timeSlotRepositroy = AppDataSource.getRepository(TimeSlot);
  private userRepositroy = AppDataSource.getRepository(User);
  private gameHistoryRepositroy = AppDataSource.getRepository(GameHistory);

  async getAllStadiums(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const allStadiums = await this.stadiumRepository
        .createQueryBuilder("stadium")
        .leftJoinAndSelect("stadium.field", "field")
        .leftJoinAndSelect("stadium.stadiumImages", "imageStadium")
        .leftJoinAndSelect("stadium.timeSlots", "timeSlot")
        .leftJoinAndSelect("stadium.feedbacks", "feedback")
        .leftJoinAndSelect("timeSlot.team", "user")
        .orderBy("timeSlot.endTime", "ASC") // Order by date in descending order
        .getMany();

      response.send({
        count: allStadiums.length,
        data: allStadiums,
      });
    } catch (error) {
      Error(error);
      console.log("err", error);

      response.status(500).send(error);
    }
  }

  async updateTimeSlotStadiums() {
    try {
      const allStadiums = await this.getAllStadiumsWithTimeSlots();

      for (const stadium of allStadiums) {
        for (const timeSlot of stadium.timeSlots) {
          if (this.isTimeSlotExpired(timeSlot)) {
            await this.removeTimeSlotRelationships(timeSlot);

            const newGameHistory = await this.createGameHistory(
              timeSlot,
              stadium
            );

            await this.updateUsersWithGameHistory(timeSlot, newGameHistory);

            await this.createOrUpdateNewTimeSlot(timeSlot, stadium);
          }
        }
      }
    } catch (error) {
      console.error("Error in updateTimeSlotStadiums:", error);
    }
  }

  async getAllStadiumsWithTimeSlots() {
    return await this.stadiumRepository
      .createQueryBuilder("stadium")
      .leftJoinAndSelect("stadium.field", "field")
      .leftJoinAndSelect("stadium.timeSlots", "timeSlot")
      .leftJoinAndSelect("timeSlot.team", "user")
      .getMany();
  }

  isTimeSlotExpired(timeSlot: TimeSlot): boolean {
    const timeOfEndingGame = new Date(timeSlot.endTime);
    const currentTime = new Date();
    timeOfEndingGame.setHours(0, 0, 0, 0);
    currentTime.setHours(0, 0, 0, 0);

    return currentTime > timeOfEndingGame;
  }

  async removeTimeSlotRelationships(timeSlot: TimeSlot) {
    for (const user of timeSlot.team) {
      await this.userRepositroy
        .createQueryBuilder()
        .relation(User, "timeSlots")
        .of(user)
        .remove(timeSlot);
    }
  }

  async createGameHistory(
    timeSlot: TimeSlot,
    stadium: Stadium
  ): Promise<GameHistory> {
    const newGameHistory = new GameHistory();
    newGameHistory.day = timeSlot.day;
    newGameHistory.startTime = timeSlot.startTime;
    newGameHistory.endTime = timeSlot.endTime;
    newGameHistory.stadium = stadium;

    try {
      return await this.gameHistoryRepositroy.save(newGameHistory);
    } catch (error) {
      console.error("Error saving newGameHistory:", error);
      throw error;
    }
  }

  async updateUsersWithGameHistory(
    timeSlot: TimeSlot,
    newGameHistory: GameHistory
  ) {
    for (const user of timeSlot.team) {
      const updateUser = await this.userRepositroy.findOne({
        where: { id: user.id },
        relations: ["timeSlots", "gameHistories"],
      });

      if (updateUser) {
        updateUser.gameHistories.push(newGameHistory);

        try {
          await this.userRepositroy.save(updateUser);
          console.log("User updated with newGameHistory:", updateUser);
        } catch (error) {
          console.error("Error saving updateUser:", error);
          throw error;
        }
      } else {
        console.error("User not found for id:", user.id);
      }
    }
  }

  async createOrUpdateNewTimeSlot(timeSlot: TimeSlot, stadium: Stadium) {
    timeSlot.startTime.setDate(timeSlot.startTime.getDate() + 7);
    timeSlot.endTime.setDate(timeSlot.endTime.getDate() + 7);

    const existingTimeSlot = await this.timeSlotRepositroy.findOneBy({
      id: timeSlot.id,
    });

    if (existingTimeSlot) {
      await this.timeSlotRepositroy.remove(existingTimeSlot);
    }

    const newTimeSlot: any = {
      day: timeSlot.day,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      stadium: { id: stadium.id },
    };

    await this.timeSlotRepositroy.save(newTimeSlot);
  }

  // Get one stadium
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
        .leftJoinAndSelect("stadium.stadiumImages", "imageStadium")
        .leftJoinAndSelect("stadium.feedbacks", "feedback")
        .leftJoinAndSelect("feedback.user", "feedbackUser") // Use a different alias here
        .leftJoinAndSelect("timeSlot.team", "timeSlotUser") // Use a different alias here
        .where("stadium.id = :id", { id })
        .getOne();
  
      if (!oneStadium) {
        response.send({
          success: false,
          message: "Cet stadium n'existe pas !",
        });
      } else {
        response.send({ data: oneStadium });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }
  
  // Create stadium

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
  // Update Stadium
  async updateStadium(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);
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

      let stadiumToUpdate = await this.stadiumRepository
        .createQueryBuilder("stadium")
        .where("user.id = :id", { id })
        .getOne();

      if (!stadiumToUpdate) {
        return response.status(400).json({
          error: "User does not exist!!",
        });
      } else {
        stadiumToUpdate.stadiumName = stadiumName;
        stadiumToUpdate.capacity = capacity;
        stadiumToUpdate.price = price;
        stadiumToUpdate.longitude = longitude;
        stadiumToUpdate.latitude = latitude;
        stadiumToUpdate.status = status;
        stadiumToUpdate.isFree = isFree;
        stadiumToUpdate.isInDoor = isInDoor;
        stadiumToUpdate.hasLighting = hasLighting;
        stadiumToUpdate.hasShower = hasShower;
        stadiumToUpdate.Region = Region;
        stadiumToUpdate.numberOfCourts = numberOfCourts;
        stadiumToUpdate.numberOfHoops = numberOfHoops;

        await this.stadiumRepository.save(stadiumToUpdate);

        response.send({ data: stadiumToUpdate });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }
  // Delete Stadium
  async deleteStadium(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);

    let stadiumToRemove = await this.stadiumRepository.findOneBy({ id });

    if (!stadiumToRemove) {
      response.send({
        success: false,
        message: "stadium not found.",
      });
    } else {
      return this.stadiumRepository.remove(stadiumToRemove);
    }
  }


}

export default new StadiumController();
