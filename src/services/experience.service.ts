// import { Models } from "../interfaces/general";
import { Experience } from "../models/experience.model";

export class ExperienceService {
  async registerExperience(
    userId: number,
    companyName: string,
    role: string,
    startDate: Date,
    endDate: Date,
    description: string,
  ): Promise<Experience> {
    try {
      const newExperience = await Experience.create({
        userId,
        companyName,
        role,
        startDate,
        endDate,
        description,
      });

      return newExperience;
    } catch (error) {
      console.log(error);
    }
  }
}
