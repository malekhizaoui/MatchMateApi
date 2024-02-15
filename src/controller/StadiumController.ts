import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Stadium } from "../entity/Stadium";

export class StadiumController {
  private stadiumRepository = AppDataSource.getRepository(Stadium);

  async getAllStadiums(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
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
        response.send({ data: oneStadium });
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
      const { stadiumName, fieldId } = request.body;

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
          field: { id: fieldId }, // Assuming fieldId is passed in the request body
          /* Add other fields as needed */
        };

        return this.stadiumRepository.save(newStadium);
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  //   async updateUserByID(
  // 	request: Request,
  // 	response: Response,
  // 	next: NextFunction
  // ) {
  // 	try {
  // 		const id = parseInt(request.params.id);
  // 		const {
  // 			fieldName,
  // 			imageURL
  // 		} = request.body;

  // 		let fieldToUpdate = await this.stadiumRepository.findOneBy({ id });

  // 		if (!fieldToUpdate) {
  // 			return response.status(400).json({
  // 				error: "user n'existe pas!!",
  // 			});
  // 		} else {
  // 			fieldToUpdate.fieldName = fieldName;
  // 			fieldToUpdate.imageURL = imageURL;

  // 			return this.stadiumRepository.save(fieldToUpdate);
  // 		}
  // 	} catch (error) {
  // 		Error(error);
  // 		response.status(500).send(error);
  // 	}
  // }
}
