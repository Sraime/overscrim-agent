import { Message } from "discord.js";

export function TimeArgumentParser(msg: Message, phrase: string) {
  if (!phrase) return null;
  const regexTime = new RegExp(/^[0,1,2][0-9]:[0-5][0-9]$/);
  return regexTime.test(phrase)
    ? {
        hours: parseInt(phrase.substring(0, 1), 10),
        minutes: parseInt(phrase.substring(3, 4), 10),
      }
    : null;
}
