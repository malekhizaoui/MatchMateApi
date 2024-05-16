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


//   async getOneField(request: Request, response: Response, next: NextFunction) {
//     try {
//       const id = parseInt(request.params.id);

//       const oneField = await this.fieldRepository
//         .createQueryBuilder("field")
//         .leftJoinAndSelect("field.stadiums", "stadium")
//         .where("field.id = :id", { id })
//         .getOne();

//       if (!oneField) {
//         response.send({
//           success: false,
//           message: "Cet field n'existe pas !",
//         });
//       } else {
//         response.send({ data: oneField });
//       }
//     } catch (error) {
//       console.error(error);
//       response.status(500).send(error);
//     }
//   }

// async createField(
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) {
//     try {
//         const {
//             fieldName,
//             imageURL
//         } = request.body;

//         const findield = await this.fieldRepository.findOne({
//             where: { fieldName },
//         });
        

//         if (findield) {
//             response.send({
//                 success: false,
//                 message: 'ce thematique existe déjà dans la base de données!',
//             });
//         }  else {
//                 const newField: any = {
//                     fieldName,
//                     imageURL
//                 };
//                 return this.fieldRepository.save(newField);
//             }
//         }
//      catch (error) {
//         Error(error);
//         response.status(500).send(error);
//     }
// }

// async updateField(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   try {
    
//     const id = parseInt(request.params.id);
//     const {
//       fieldName
//     } = request.body;

//     let fieldToUpdate = await this.fieldRepository
//     .createQueryBuilder("stadium")
//     .where("user.id = :id", { id })
//     .getOne();

//     if (!fieldToUpdate) {
//       return response.status(400).json({
//         error: "User does not exist!!",
//       });
//     } else {
//       fieldToUpdate.fieldName = fieldName;
//      ;

//       await this.fieldRepository.save(fieldToUpdate);

//       response.send({ data: fieldToUpdate });
//     }
//   } catch (error) {
//     console.error(error);
//     response.status(500).send(error);
//   }
// }

// async deleteField(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   const id = parseInt(request.params.id);

//   let fieldToRemove = await this.fieldRepository.findOneBy({ id });

//   if (!fieldToRemove) {
//     response.send({
//       success: false,
//       message: "field not found.",
//     });
//   } else {
//     return this.fieldRepository.remove(fieldToRemove);
//   }
// }

}