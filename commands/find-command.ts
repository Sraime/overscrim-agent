import { Argument, Command } from "discord-akairo";
import { Message } from "discord.js";
import { ScrimService } from "../services/scrim-service";
import { ScrimListFormater } from "../text-formaters/scrim-list-formater";

export default class InfoCommand extends Command {
  public constructor() {
    super("find", {
      aliases: ["find"],
      category: "Public Commands",
      description: {
        content: "Get information about this bot.",
        usage: "find",
        example: ["find"],
      },
      ratelimit: 3,
      args: [
        {
          id: "region",
          type: "string",
        },
        {
          id: "platform",
          type: "string",
        },
        {
          id: "srmin",
          type: "number",
        },
        {
          id: "srmax",
          type: "number",
        },
        {
          id: "date",
          type: "date",
        },
      ],
    });
  }

  async exec(message: Message, args: any): Promise<Message> {
    if (!message.util) throw new Error("undefined options");
    try {
      const scrims = await ScrimService.getFilteredScrims({
        region: args[0],
        platform: args[1],
        srmin: args[2],
        srmax: args[3],
        date: args[4],
      });

      if (scrims.length == 0) {
        return message.util.send(`No scrim registered for those parameters`);
      } else {
        const scrimListFormater = new ScrimListFormater();
        return message.util.send(scrimListFormater.formatData(scrims));
      }
    } catch (e) {
      return message.util.send("invalid arguments");
    }
  }
}
