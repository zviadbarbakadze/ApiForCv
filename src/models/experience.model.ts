import { DATE, DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Models } from "../interfaces/general";

interface ExperienceAttributes {
  id: number;
  userId: number;
  companyName: string;
  role: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export class Experience
  extends Model<ExperienceAttributes, Optional<ExperienceAttributes, "id">>
  implements ExperienceAttributes
{
  id: number;
  userId: number;
  companyName: string;
  role: string;
  startDate: Date;
  endDate: Date;
  description: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static defineSchema(sequelize: Sequelize) {
    Experience.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          field: "user_id",
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },

        companyName: {
          field: "company_name",
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        role: {
          field: "role",
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        startDate: {
          field: "startDate",
          type: DATE,
          allowNull: false,
        },
        endDate: {
          field: "endDate",
          type: DATE,
          allowNull: false,
        },

        description: {
          field: "description",
          type: new DataTypes.TEXT(),
          allowNull: false,
        },
      },
      {
        tableName: "experiences",
        underscored: true,
        sequelize,
      },
    );
  }

  static associate(models: Models) {
    //removed sequelize: Sequelize from the parameter

    Experience.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  }
}
