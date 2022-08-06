import { randomUUID } from "crypto";

import { IUser } from "../interfaces/IUser";
import { prisma } from "../prisma";

export class User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  constructor(private user: IUser) {
    this.id = user.id ?? randomUUID();
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
  }
  async saveUser() {
    const existUser = await prisma.users.findFirst({
      where: {
        OR: [
          {
            email: this.email,
          },
          {
            phone: this.phone,
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
          name: this.name,
          email: this.email,
          phone: this.phone,
        },
      });
    } else {
      await prisma.users.create({
        data: {
          id: this.id,
          name: this.name,
          email: this.email,
          phone: this.phone,
        },
      });
    }
  }
}
