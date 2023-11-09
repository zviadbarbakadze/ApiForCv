import { Context } from "../interfaces/general";
import { AuthService } from "../services/auth.service";
import { ExperienceService } from "../services/experience.service";
import { FeedbackService } from "../services/feedback.service";
import { ProjectService } from "../services/projects.service";
import { CvService } from "../services/cv.service";
import { CacheService } from "../services/cache.service";

export const loadContext = async (): Promise<Context> => {
  return {
    services: {
      authService: new AuthService(),
      experienceService: new ExperienceService(),
      feedbackService: new FeedbackService(),
      projectService: new ProjectService(),
      cvService: new CvService(),
      cacheService: new CacheService(),
    },
  };
};
