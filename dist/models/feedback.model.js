"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const sequelize_1 = require("sequelize");
class Feedback extends sequelize_1.Model {
    static defineSchema(sequelize) {
        Feedback.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            fromUser: {
                field: "from_user",
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            toUser: {
                field: "to_user",
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            content: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            companyName: {
                field: "company_name",
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
        }, {
            tableName: "feedbacks",
            underscored: true,
            sequelize,
        });
    }
    static associate(models) {
        //removed sequelize: Sequelize from the parameter
        Feedback.belongsTo(models.user, {
            foreignKey: "fromUser",
            as: "sender",
        });
        Feedback.belongsTo(models.user, {
            foreignKey: "toUser",
            as: "receiver",
        });
    }
}
exports.Feedback = Feedback;
//# sourceMappingURL=feedback.model.js.map