import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { ImageStadium } from "../entity/ImageStadium";
import { Stadium } from "../entity/Stadium";

export class ImageStadiumController {
  private imageStadiumRepository = AppDataSource.getRepository(ImageStadium);
  private stadiumRepository = AppDataSource.getRepository(Stadium);

  async getAllImagesStadium(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const allImages = await this.imageStadiumRepository
        .createQueryBuilder("imageStadium")
        .leftJoinAndSelect("imageStadium.stadium", "stadium")
        .getMany();

      response.send({
        count: allImages.length,
        data: allImages,
      });
    } catch (error) {
      Error(error);
      response.status(500).send(error);
    }
  }

  async getOneImageStadium(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);

      const oneStadium = await this.imageStadiumRepository
        .createQueryBuilder("imageStadium")
        .leftJoinAndSelect("imageStadium.stadium", "stadium")
        .where("imageStadium.id = :id", { id })
        .getOne();

      if (!oneStadium) {
        response.send({
          success: false,
          message: "stadium not found !",
        });
      } else {
        response.send({ data: oneStadium });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  async createImageStadium(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const {designation, imageURL, legende, stadiumId } = request.body;
      const stadium = await this.stadiumRepository.findOneBy(stadiumId);

      if (!stadium ) {
        
        response.send({
          success: false,
          message: "This stadium does not exist in the database!",
        });
      } else {
        const newImageStadium: any = {
          designation,
          imageURL,
          legende,
          stadium: { id: stadiumId }, 
        };

        return this.imageStadiumRepository.save(newImageStadium);
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  async updateImageStadium(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const { designation, imageURL, legende, stadiumId } = request.body;

      let imageStadiumToUpdate = await this.imageStadiumRepository
        .createQueryBuilder("stadium")
        .where("user.id = :id", { id })
        .getOne();

      if (!imageStadiumToUpdate) {
        return response.status(400).json({
          error: "User does not exist!!",
        });
      } else {
        imageStadiumToUpdate.designation = designation;
        imageStadiumToUpdate.imageURL = imageURL;
        imageStadiumToUpdate.legende = legende;
        imageStadiumToUpdate.stadium = stadiumId;
        await this.imageStadiumRepository.save(imageStadiumToUpdate);

        response.send({ data: imageStadiumToUpdate });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  async deleteImageStadium(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let imageStadiumToRemove = await this.imageStadiumRepository.findOneBy({ id });

    if (!imageStadiumToRemove) {
      response.send({
        success: false,
        message: "imageStadium not found.",
      });
    } else {
      return this.imageStadiumRepository.remove(imageStadiumToRemove);
    }
  }
}
