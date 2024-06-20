import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { GameHistory } from "../entity/GameHistory";
export class GameHistoryController {
  private gameHistoryRepository = AppDataSource.getRepository(GameHistory);

  async getAllGameHistories(request: Request, response: Response, next: NextFunction) {
    try {
      const allGameHistories = await this.gameHistoryRepository
      .createQueryBuilder("gameHistory")
      .leftJoinAndSelect("gameHistory.team", "user")
      .leftJoinAndSelect("gameHistory.stadium", "stadium")
      .getMany();

      response.send({
        count: allGameHistories.length,
        data: allGameHistories,
      });
    } catch (error) {
      Error(error);
      response.status(500).send(error);
    }
  }
  async getGameHistoryById(request: Request, response: Response, next: NextFunction) {
    try {
      const gameHistoryId = request.params.id;

      const gameHistory = await this.gameHistoryRepository
        .createQueryBuilder("gameHistory")
        .leftJoinAndSelect("gameHistory.team", "team")
        .leftJoinAndSelect("gameHistory.stadium", "stadium")
        .leftJoinAndSelect("stadium.field", "field")
        .where("gameHistory.id = :id", { id: gameHistoryId })
        .getOne();

      if (gameHistory) {
        response.send({
          data: gameHistory,
        });
      } else {
        response.status(404).send({
          message: "Game history not found",
        });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      response.status(500).send({
        message: "Internal server error",
      });
    }
  }

  async getAllGameHistoriesbyUserId(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = parseInt(request.params.id);

      const allGameHistories = await this.gameHistoryRepository
      .createQueryBuilder("gameHistory")
      .leftJoinAndSelect("gameHistory.team", "user")
      .leftJoinAndSelect("gameHistory.stadium", "stadium")
      .where("user.id = :userId", { userId })
      .getMany();

      response.send({
        count: allGameHistories.length,
        data: allGameHistories,
      });
    } catch (error) {
      Error(error);
      response.status(500).send(error);
    }
  }




}
