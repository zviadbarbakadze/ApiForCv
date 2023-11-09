"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (app, _context) => {
    app.use((err, req, res, next) => {
        req.logger.error({
            message: "this is error handler message",
            correlationId: req.id,
        });
        res.status(500).json({ error: "Something went wrong to the server" });
        next(err);
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map