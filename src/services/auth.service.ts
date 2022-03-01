import { HttpError } from "errors";
import { UserEntity } from "types/user.entity";
import appConfig from "../app-config.json";

export interface UserCredentials {
  username: string;
  password: string;
}

export default class AuthService {
  static async login({
    username,
    password,
  }: UserCredentials): Promise<UserEntity> {
    const { mockUser, mockCredentials } = appConfig;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          username === mockCredentials.username &&
          password === mockCredentials.password
        ) {
          return resolve(mockUser);
        }

        return reject(
          new HttpError("Имя пользователя или пароль введены не верно")
        );
      }, 1000);
    });
  }
}
