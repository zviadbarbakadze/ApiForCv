"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const sequelize_1 = require("sequelize");
class Project extends sequelize_1.Model {
    static defineSchema(sequelize) {
        Project.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                field: "user_id",
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            image: {
                type: sequelize_1.DataTypes.STRING(256),
                allowNull: false,
            },
            description: {
                field: "description",
                type: new sequelize_1.DataTypes.TEXT(),
                allowNull: false,
            },
        }, {
            tableName: "projects",
            underscored: true,
            sequelize,
        });
    }
    static associate(models) {
        //removed sequelize: Sequelize from the parameter
        Project.belongsTo(models.user, {
            foreignKey: "userId",
            as: "user",
        });
    }
}
exports.Project = Project;
//# sourceMappingURL=project.model.js.map