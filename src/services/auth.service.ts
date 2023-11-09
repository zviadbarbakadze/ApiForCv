import * as bcrypt from "bcrypt";

import { User, UserRole } from "../models/user.model";

export class AuthService {
  async registerUser(
    firstName: string,
    lastName: string,
    image: string,
    title: string,
    summary: string,
    role: UserRole,
    email: string,
    password: string
  ): Promise<User> {
    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        throw new Error("email should be unique");
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        image,
        title,
        summary,
        role,
        email,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  async findUserById(id: number) {
    return await User.findOne({ where: { id } });
  }
}
