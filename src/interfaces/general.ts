import express from "express";
import { AuthService } from "../services/auth.service";
import { ExperienceService } from "../services/experience.service";
import { FeedbackService } from "../services/feedback.service";
import { ProjectService } from "../services/projects.service";
import { CvService } from "../services/cv.service";
import { CacheService } from "../services/cache.service";

import { User } from "../models/user.model";
import { Feedback } from "../models/feedback.model";
import { Project } from "../models/project.model";
import { Experience } from "../models/experience.model";

export interface Context {
  services: {
    authService: AuthService;
    experienceService: ExperienceService;
    feedbackService: FeedbackService;
    projectService: ProjectService;
    cvService: CvService;
    cacheService: CacheService;
  };
}

export type RouterFactory = (context: Context) => express.Router;

export type Loader = (app: express.Application, context: Context) => void;

export interface Models {
  user: typeof User;
  feedback: typeof Feedback;
  project: typeof Project;
  experience: typeof Experience;
}
