import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Feedback } from "../entity/Feedback";
import { User } from "../entity/User";
import { Stadium } from "../entity/Stadium";

export class FeedbackController {
  private feedbackRepository = AppDataSource.getRepository(Feedback);
  private userRepository = AppDataSource.getRepository(User);
  private stadiumRepository = AppDataSource.getRepository(Stadium);

  async getAllFeedbacks(request: Request, response: Response, next: NextFunction) {
    try {
      const allFeedbacks = await this.feedbackRepository
        .createQueryBuilder("feedback")
        .leftJoinAndSelect("feedback.user", "user")
        .leftJoinAndSelect("feedback.stadium", "stadium")
        .getMany();

      response.send({
        count: allFeedbacks.length,
        data: allFeedbacks,
      });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  async getFeedbackById(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      const feedback = await this.feedbackRepository
        .createQueryBuilder("feedback")
        .leftJoinAndSelect("feedback.user", "user")
        .leftJoinAndSelect("feedback.stadium", "stadium")
        .where("feedback.id = :id", { id })
        .getOne();

      if (!feedback) {
        response.status(404).send({
          success: false,
          message: "Feedback not found",
        });
      } else {
        response.send({ data: feedback });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  async createFeedback(request: Request, response: Response, next: NextFunction) {
    try {
      const { stars, comment } = request.body;
      const userId = parseInt(request.params.userId, 10);
      const stadiumId = parseInt(request.params.stadiumId, 10);
  
      // Validate that userId and stadiumId are valid integers
      if (isNaN(userId) || isNaN(stadiumId)) {
        return response.status(400).send({
          success: false,
          message: "Invalid userId or stadiumId",
        });
      }
  
      const user = await this.userRepository.findOneBy({ id: userId });
      const stadium = await this.stadiumRepository.findOneBy({ id: stadiumId });
  
      if (!user || !stadium) {
        return response.status(404).send({
          success: false,
          message: "User or Stadium not found",
        });
      }
  
      const feedback = new Feedback();
      feedback.stars = stars;
      feedback.comment = comment;
      feedback.user = user;
      feedback.stadium = stadium;
  
      await this.feedbackRepository.save(feedback);
  
      response.status(201).send({ data: feedback });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }
  

  async updateFeedback(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const { stars, comment } = request.body;

      let feedback = await this.feedbackRepository.findOneBy({id});

      if (!feedback) {
        return response.status(404).send({
          success: false,
          message: "Feedback not found",
        });
      }

      feedback.stars = stars;
      feedback.comment = comment;

      await this.feedbackRepository.save(feedback);

      response.send({ data: feedback });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  async deleteFeedback(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      let feedbackToRemove = await this.feedbackRepository.findOneBy({id});

      if (!feedbackToRemove) {
        return response.status(404).send({
          success: false,
          message: "Feedback not found",
        });
      }

      await this.feedbackRepository.remove(feedbackToRemove);

      response.send({
        success: true,
        message: "Feedback deleted successfully",
      });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }
}
