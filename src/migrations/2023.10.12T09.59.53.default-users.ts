import { MigrationFn } from "umzug";
import { Sequelize } from "sequelize";
import * as bcrypt from "bcrypt";

export const up: MigrationFn<Sequelize> = async ({ context }) => {
  const q = context.getQueryInterface();
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash("1234567", saltRounds);

  await q.bulkInsert("users", [
    {
      first_name: "John",
      last_name: "Doe",
      image: "../public/default.png",
      title: "some title",
      summary: "some summary",
      role: "Admin",
      email: "example@example.com",
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      image: "../public/default.png",
      title: "some title",
      summary: "some summary",
      role: "User",
      email: "Jane@example.com",
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down: MigrationFn<Sequelize> = async ({ context }) => {
  const q = context.getQueryInterface();

  await q.bulkDelete("users", null, {});
};
