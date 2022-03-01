import { HttpError } from "errors";
import { UserEntity } from "types/user.entity";

export interface UserCredentials {
  username: string;
  password: string;
}

export default class AuthService {
  public static mockUser: UserEntity = {
    id: "494feda6-1912-4385-bb50-25fa1b29b242",
    name: "Admin",
    balance: 1000,
  };

  private static mockCredentials: UserCredentials = {
    username: "admin",
    password: "123456",
  };

  static async login({
    username,
    password,
  }: UserCredentials): Promise<UserEntity> {
    const { mockUser } = AuthService;
    const { mockCredentials } = AuthService;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          username === mockCredentials.username &&
          password === mockCredentials.password
        ) {
          return resolve(mockUser);
        }

        return reject(new HttpError("Неверный логин или пароль"));
      }, 1000);
    });
  }
}
