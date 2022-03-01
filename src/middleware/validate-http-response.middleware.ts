import { HttpError } from "errors";

export const validateHttpResponse = (response: Response) => {
  if (response.ok) return response.json();

  let error: string;

  switch (response.status) {
    case 400:
      error = "На сервер отправлены некорректые данные";
      break;
    case 401:
      error = "Ошибка авторизации";
      break;
    case 403:
      error = "Неверный логин или пароль";
      break;
    case 404:
      error = "Запрос не найден";
      break;
    case 500:
      error = "Произошла ошибка на сервере";
      break;
    default:
      error = "Неизвестная ошибка";
  }

  return Promise.reject(new HttpError(error));
};
