import { MigrationFn } from "umzug";
import { DATE, DataTypes, Sequelize } from "sequelize";

export const up: MigrationFn<Sequelize> = async ({ context }) => {
  const q = context.getQueryInterface();

  await q.createTable("experiences", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    company_name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    startDate: {
      type: DATE,
      allowNull: false,
    },
    endDate: {
      type: DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });
};

export const down: MigrationFn<Sequelize> = async ({ context }) => {
  const q = context.getQueryInterface();

  await q.dropTable("experiences");
};
