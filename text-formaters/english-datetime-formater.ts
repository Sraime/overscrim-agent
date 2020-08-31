import { TextFormater } from "./text-formater";

export class EnglishDatetimeFormater implements TextFormater {
  formatData(date: Date): string {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${date.getDate()} ${date.getHours()}:${("0" + date.getMinutes()).slice(
      -2
    )} `;
  }
}
