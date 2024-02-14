import { Request, Response, NextFunction } from "express";
import { Team } from "../entity/Team";
import { AppDataSource } from "../data-source";

class TeamController {
  private teamRepository = AppDataSource.getRepository(Team);

  async createTeam(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { teamName, teamSize} = request.body;

      const team = await this.teamRepository.findOne({
        where: { teamName },
      });

      if (team) {
        response.send({
          success: false,
          message: 'This stadium already exists in the database!',
        });
      } else {
        const newTeam: any = {
          teamName,
            teamSize , // Assuming fieldId is passed in the request body
          /* Add other fields as needed */
        };

        return this.teamRepository.save(newTeam);
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }

  async getAllTeams(request: Request, response: Response, next: NextFunction) {
    try {
      const allTeams = await this.teamRepository
        .createQueryBuilder("team")
        .leftJoinAndSelect("team.timeSlots", "timeSlot")
        .getMany();

      response.send({
        count: allTeams.length,
        data: allTeams,
      });
    } catch (error) {
      Error(error);
      response.status(500).send(error);
    }
  }
 
}

export default TeamController;
