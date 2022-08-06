import { User } from "../../interfaces/IUser";
import { IUserRequest } from "../../interfaces/IUserRequest";

export interface IUsersRepotory {
  saveUser(user: IUserRequest): Promise<void>;
  findUser(phone: string): Promise<User>;
}
