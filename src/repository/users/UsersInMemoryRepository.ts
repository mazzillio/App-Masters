import { randomUUID } from "crypto";

import { User } from "../../interfaces/IUser";
import { IUserRequest } from "../../interfaces/IUserRequest";
import { IUsersRepotory } from "./IUsersRepository";

export class UserInMemoryRepository implements IUsersRepotory {
  private users: User[] = [];
  async saveUser(user: IUserRequest): Promise<void> {
    this.users.push({
      id: randomUUID(),
      name: user.name,
      email: user.email as string,
      phone: user.phone,
    });
  }
  async findUser(phone: string): Promise<User> {
    const user = this.users.find((user) => user.phone === phone);
    return user as User;
  }
}
