import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { TimeSlot } from "../entity/TimeSlot";
import * as bcrypt from "bcrypt";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private timeSlotRepository = AppDataSource.getRepository(TimeSlot);

  async getAllUsers(request: Request, response: Response, next: NextFunction) {
    try {
      const allUsers = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.timeSlots", "timeSlot")
        .leftJoinAndSelect("user.gameHistories", "gameHistory")
        // .leftJoinAndSelect("gameHistories.stadium", "stadium")
        // .leftJoinAndSelect("gameHistories.team", "user")
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
        .leftJoinAndSelect("user.gameHistories", "gameHistory")

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

  async updateUser(request: Request, response: Response, next: NextFunction) {
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
        timeSlotId,
      } = request.body;

      let userToUpdate = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.timeSlots", "timeSlot")
        .where("user.id = :id", { id })
        .getOne();

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
        if (password) {
          const saltRounds = 10;
          userToUpdate.password = await bcrypt.hash(password, saltRounds);
        }
        userToUpdate.age = age;
        userToUpdate.hobbies = hobbies;
        userToUpdate.image = image;
        userToUpdate.region = region;

        // Initialize timeSlots if not already set
        if (!userToUpdate.timeSlots) {
          userToUpdate.timeSlots = [];
        }

        // Find and update the TimeSlot
        const timeSlot = await this.timeSlotRepository.findOne({
          where: { id: timeSlotId },
        });

        if (timeSlot) {
          // Check if the user already has this timeSlot, and add it only if not present
          if (
            !userToUpdate.timeSlots.find(
              (existingTimeSlot) => existingTimeSlot.id === timeSlot.id
            )
          ) {
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

  async deleteUser(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      response.send({
        success: false,
        message: "user not found.",
      });
    } else {
      return this.userRepository.remove(userToRemove);
    }
  }


  async deleteTimeSlotFromUser(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = parseInt(request.params.userId);
      const timeSlotId = parseInt(request.params.timeSlotId);

      // Find the user
      let user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ["timeSlots"],
      });

      if (!user) {
        return response.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if the timeSlot exists in the user's timeSlots
      const timeSlotIndex = user.timeSlots.findIndex((ts) => ts.id === timeSlotId);

      if (timeSlotIndex === -1) {
        return response.status(404).json({
          success: false,
          message: "TimeSlot not found in user's timeSlots",
        });
      }

      // Remove the timeSlot from the user's timeSlots array
      user.timeSlots.splice(timeSlotIndex, 1);

      // Save the updated user
      await this.userRepository.save(user);

      response.status(200).json({
        success: true,
        message: "TimeSlot removed from user successfully",
        data: user,
      });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }
}
