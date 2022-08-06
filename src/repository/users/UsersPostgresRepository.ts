import { randomUUID } from "crypto";

import { User } from "../../interfaces/IUser";
import { IUserRequest } from "../../interfaces/IUserRequest";
import { prisma } from "../../prisma";
import { IUsersRepotory } from "./IUsersRepository";

export class UsersPostgresRepository implements IUsersRepotory {
  async saveUser(user: IUserRequest): Promise<void> {
    const existUser = await prisma.users.findFirst({
      where: {
        OR: [
          {
            email: user.email,
          },
          {
            phone: user.phone,
          },
        ],
      },
    });
    if (existUser) {
      await prisma.users.update({
        where: {
          id: existUser.id,
        },
        data: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    } else {
      await prisma.users.create({
        data: {
          id: randomUUID(),
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    }
  }
  async findUser(phone: string): Promise<User> {
    const user = (await prisma.users.findUnique({
      where: {
        phone,
      },
    })) as User;
    return user;
  }
}
