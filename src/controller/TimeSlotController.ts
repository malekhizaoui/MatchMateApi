import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
// import { Team } from "../entity/Team";
import { Stadium } from "../entity/Stadium";
import { TimeSlot } from "../entity/TimeSlot";
export class TimeSlotsController {
  private userRepository = AppDataSource.getRepository(User);
  // private teamRepository = AppDataSource.getRepository(Team);
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
      Error(error);
      response.status(500).send(error);
    }
  }

  async getOneUser(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      const oneUser = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.teams", "team")
        .where("user.id = :id", { id })
        .getOne();

      if (!oneUser) {
        response.send({
          success: false,
          message: "Cet utilisateur n'existe pas !",
        });
      } else {
        response.send({ data: oneUser });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  async updateUserByID(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);
      const {
        lastName,
        firstName,
        email,
        code_verification,
        is_verified,
        password,
        age,
        hobbies,
        image,
        region,
      } = request.body;

      let userToUpdate = await this.userRepository.findOneBy({ id });

      if (!userToUpdate) {
        return response.status(400).json({
          error: "user n'existe pas!!",
        });
      } else {
        userToUpdate.lastName = lastName;
        userToUpdate.firstName = firstName;
        userToUpdate.email = email;
        userToUpdate.code_verification = code_verification;
        userToUpdate.is_verified = is_verified;
        userToUpdate.password = password;
        userToUpdate.age = age;
        userToUpdate.hobbies = hobbies;
        userToUpdate.image = image;
        userToUpdate.region = region;

        return this.userRepository.save(userToUpdate);
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
      // const team = await this.teamRepository.findOneBy(teamId);

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
}
