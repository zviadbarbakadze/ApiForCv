import { Project } from "../models/project.model";

export class ProjectService {
  async registerProject(
    userId: number,
    image: string,
    description: string,
  ): Promise<Project> {
    try {
      const newProject = await Project.create({
        userId,
        image,
        description,
      });

      return newProject;
    } catch (error) {
      console.log(error);
    }
  }
}
