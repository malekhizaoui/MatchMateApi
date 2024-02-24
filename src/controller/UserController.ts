import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { TimeSlot } from "../entity/TimeSlot";
export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private timeSlotRepository = AppDataSource.getRepository(TimeSlot);

  async getAllUsers(request: Request, response: Response, next: NextFunction) {
    
    try {
      console.log("dddd");

      const allUsers = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.timeSlots", "timeSlot")
        .getMany();

      response.send({
        count: allUsers.length,
        data: allUsers,
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
        .leftJoinAndSelect("user.timeSlots", "timeSlot")
        .leftJoinAndSelect("timeSlot.stadium", "stadium")
        .leftJoinAndSelect("timeSlot.team", "team")
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
      console.log('dsdsd');
      
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
        timeSlotId
      } = request.body;
  
      let userToUpdate = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.timeSlots", "timeSlot")
      .where("user.id = :id", { id })
      .getOne();;
  
      if (!userToUpdate) {
        return response.status(400).json({
          error: "User does not exist!!",
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
  
        // Initialize timeSlots if not already set
      console.log("userToUpdate.timeSlots",userToUpdate.timeSlots);
      
        if (!userToUpdate.timeSlots) {
          userToUpdate.timeSlots = [];
        }
  
        // Find and update the TimeSlot
        const timeSlot = await this.timeSlotRepository.findOne({where:{ id: timeSlotId }});
  
        if (timeSlot) {
          // Check if the user already has this timeSlot, and add it only if not present
          if (!userToUpdate.timeSlots.find(existingTimeSlot => existingTimeSlot.id === timeSlot.id)) {
            userToUpdate.timeSlots.push(timeSlot); // Add the new TimeSlot to the existing ones
          }
        } else {
          // Handle case where TimeSlot with the specified ID is not found
          return response.status(400).json({
            error: "TimeSlot does not exist!!",
          });
        }
  
        await this.userRepository.save(userToUpdate);
  
        response.send({ data: userToUpdate });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }
  
  
  

  async addUserToTimeSlot(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        userId,
      } = request.params;
      // Find the user and team by their IDs
      const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
     
      response.send({
          success: false,
          data: user,
        })
    } catch (error) {
      console.error("Error adding user to team:", error);
      return null;
    }
  }


}
