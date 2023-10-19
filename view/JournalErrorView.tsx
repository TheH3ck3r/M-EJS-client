import { HttpStatus } from "http-status-ts";

export const JournalErrorView = (errorStatus: number) => {
  console.log(errorStatus);
  switch (errorStatus) {
    case HttpStatus.NOT_FOUND:
      return "Вы еще ничего не добавили";
    default:
      return "Неизвестная серверная ошибка";
  }
};
