import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Team } from "../entity/Team";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private teamRepository = AppDataSource.getRepository(Team);

  async getAllUsers(request: Request, response: Response, next: NextFunction) {
    try {
      const allUsers = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.teams", "team")
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
			region
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

  
  
}
