import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { TimeSlot } from "../entity/TimeSlot";
import * as bcrypt from "bcrypt";
import { Stadium } from "../entity/Stadium";
import * as qrcode from "qrcode";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private timeSlotRepository = AppDataSource.getRepository(TimeSlot);
  private stadiumRepository = AppDataSource.getRepository(Stadium)



  async getStadiumsExcludingFeedback(request: Request, response: Response, next: NextFunction) {    
    try {
      const userId = parseInt(request.params.id);
  
      // Fetch feedbacks for the user
      const userFeedbacks = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.feedbacks', 'feedback')
        .leftJoinAndSelect('feedback.stadium', 'stadium')
        .where('user.id = :userId', { userId })
        .getOne();
  
      // Extract stadium IDs from user's feedbacks
      const stadiumIdsWithFeedback = userFeedbacks.feedbacks.map(feedback => feedback.stadium.id);
  
      // Get stadiums where the user has game history but has not provided feedback
      const stadiums = await this.stadiumRepository.createQueryBuilder('stadium')
        .leftJoin('stadium.gameHistories', 'gameHistory')
        .leftJoin('gameHistory.team', 'user')
        .where('user.id = :userId', { userId })
        .andWhere('stadium.id NOT IN (:...stadiumIdsWithFeedback)', {
          stadiumIdsWithFeedback: stadiumIdsWithFeedback.length > 0 ? stadiumIdsWithFeedback : [null],
        })
        .getMany();
  
      response.send({
        count: stadiums.length,
        data: stadiums,
      });
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message || 'Internal server error');
    }
  }
  
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
        .leftJoinAndSelect("user.feedbacks", "feedback")
        .leftJoinAndSelect("feedback.stadium", "stadiumFeedback")
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

  async updateUser(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      const { timeSlotId } = request.body;

      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['timeSlots'],
      });

      if (!user) {
        return response.status(400).json({ error: 'User does not exist!' });
      }

      const timeSlot = await this.timeSlotRepository.findOne({
        where: { id: timeSlotId },
        relations: ['stadium'],
      });

      if (!timeSlot) {
        return response.status(400).json({ error: 'TimeSlot does not exist!' });
      }

      if (!user.timeSlots.includes(timeSlot)) {
        user.timeSlots.push(timeSlot);
      }

      const qrData = `User: ${user.firstName} ${user.lastName}, TimeSlot: ${timeSlot.day} ${timeSlot.startTime}-${timeSlot.endTime}, Stadium: ${timeSlot.stadium.stadiumName}`;
      const qrCodeUrl = await qrcode.toDataURL(qrData);
      timeSlot.qrCodeUrl = qrCodeUrl;

      await this.timeSlotRepository.save(timeSlot);
      await this.userRepository.save(user);

      response.json({ data: user, qrCodeUrl });
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
