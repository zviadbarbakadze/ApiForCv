"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMiddlewares = void 0;
const logger_1 = require("../libs/logger");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadMiddlewares = (app, _context) => {
    app.use((req, res, next) => {
        const correlationId = req.id;
        logger_1.logger.info({ correlationId, method: req.method, path: req.path }, "Incoming request");
        req.logger = logger_1.logger;
        next();
    });
};
exports.loadMiddlewares = loadMiddlewares;
//# sourceMappingURL=middlewares.js.map