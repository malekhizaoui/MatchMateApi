import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Field } from "../entity/Field";

export class FieldController {
  private fieldRepository = AppDataSource.getRepository(Field);

  async getAllFields(request: Request, response: Response, next: NextFunction) {
    try {
      const allFields = await this.fieldRepository
        .createQueryBuilder("field")
        .leftJoinAndSelect("field.stadiums", "stadium")
        .getMany();

      response.send({
        count: allFields.length,
        data: allFields,
      });
    } catch (error) {
      Error(error);
      response.status(500).send(error);
    }
  }

  async getOneField(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      const oneField = await this.fieldRepository
        .createQueryBuilder("field")
        .leftJoinAndSelect("field.stadiums", "stadium")
        .where("field.id = :id", { id })
        .getOne();

      if (!oneField) {
        response.send({
          success: false,
          message: "Cet field n'existe pas !",
        });
      } else {
        response.send({ data: oneField });
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
			fieldName,
			imageURL
		} = request.body;

		let fieldToUpdate = await this.fieldRepository.findOneBy({ id });

		if (!fieldToUpdate) {
			return response.status(400).json({
				error: "user n'existe pas!!",
			});
		} else {
			fieldToUpdate.fieldName = fieldName;
			fieldToUpdate.imageURL = imageURL;
		

			return this.fieldRepository.save(fieldToUpdate);
		}
	} catch (error) {
		Error(error);
		response.status(500).send(error);
	}
}


async createField(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const {
            fieldName,
            imageURL
        } = request.body;

        const findield = await this.fieldRepository.findOne({
            where: { fieldName },
        });

        if (findield) {
            response.send({
                success: false,
                message: 'ce thematique existe déjà dans la base de données!',
            });
        }  else {
                const newField: any = {
                    fieldName,
                    imageURL
                };
                return this.fieldRepository.save(newField);
            }
        }
     catch (error) {
        Error(error);
        response.status(500).send(error);
    }
}
}
