"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
const roles = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        req.logger.info("here should log role", user.dataValues.role);
        if (!user || !user.dataValues.role) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!allowedRoles.includes(user.dataValues.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
exports.roles = roles;
//# sourceMappingURL=roles.js.map