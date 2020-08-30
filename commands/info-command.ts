import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class InfoCommand extends Command {
  public constructor() {
    super("info", {
      aliases: ["info"],
      category: "Public Commands",
      description: {
        content: "Get information about this bot.",
        usage: "info",
        example: ["info"]
      },
      ratelimit: 3
    });
  }

  exec(message: Message): Promise<Message> {
    if (!message.util) throw new Error("undefined options");
    return message.util.send("Here is some info");
  }
}
