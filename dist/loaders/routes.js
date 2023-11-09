"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRoutes = void 0;
const auth_1 = require("../routes/auth");
const user_1 = require("../routes/user");
const experience_1 = require("../routes/experience");
const feedback_1 = require("../routes/feedback");
const project_1 = require("../routes/project");
const cv_1 = require("../routes/cv");
const loadRoutes = (app, context) => {
    app.use("/api/auth", (0, auth_1.makeAuthRouter)(context));
    app.use("/api/users", (0, user_1.makeUsersRouter)(context));
    app.use("/api/experience", (0, experience_1.makeExperienceRouter)(context));
    app.use("/api/feedback", (0, feedback_1.makeFeedbackRouter)(context));
    app.use("/api/projects", (0, project_1.makeProjectRouter)(context));
    app.use("/api/user", (0, cv_1.makeCv)(context));
};
exports.loadRoutes = loadRoutes;
//# sourceMappingURL=routes.js.map