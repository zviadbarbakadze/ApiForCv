import { User } from "../models/user.model";
import { Experience } from "../models/experience.model";
import { Feedback } from "../models/feedback.model";
import { Project } from "../models/project.model";
import { Response } from "express";

export class CvService {
  async getCv(
    id: number,
    response: Response
  ): Promise<{
    user: User;
    experiences: Experience[];
    projects: Project[];
    feedbacks: Feedback[];
  }> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        response.status(404).send("user not found");
        return;
      }

      const experiences = await Experience.findAll({
        where: {
          userId: user.id,
        },
      });
      const feedbacksOne = await Feedback.findAll({
        where: {
          fromUser: user.id,
        },
      });
      const feedbacksTwo = await Feedback.findAll({
        where: {
          toUser: user.id,
        },
      });

      const projects = await Project.findAll({
        where: {
          userId: user.id,
        },
      });
      const feedbacks = feedbacksOne.concat(feedbacksTwo);

      return {
        user,
        experiences,
        projects,
        feedbacks,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
