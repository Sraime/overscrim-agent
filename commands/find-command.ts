import { Argument } from "discord-akairo";
import { Message } from "discord.js";
import { Platform } from "../models/platform-enum";
import { Region } from "../models/region-enum";
import { ScrimService } from "../services/scrim-service";
import { ScrimListFormater } from "../text-formaters/scrim-list-formater";
import { SelfDescribedCommand } from "./self-described-command";

const regionList = Object.values(Region);
const platformList = Object.values(Platform);

export default class FindCommand extends SelfDescribedCommand {
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
          type: Argument.validate("string", (m, p, str) =>
            regionList.includes(str)
          ),
          otherwise:
            "Invalid region, please use one of the following : " + regionList,
        },
        {
          id: "platform",
          type: Argument.validate("string", (m, p, str) =>
            platformList.includes(str)
          ),
          otherwise:
            "Invalid region, please use one of the following : " + platformList,
        },
        {
          id: "srmin",
          type: Argument.range("number", 1000, 5000),
          otherwise: "<srmin> must be a number between 1000 and 5000",
        },
        {
          id: "srmax",
          type: Argument.range("number", 1000, 5000),
          otherwise: "<srmax> must be a number between 1000 and 5000",
        },
        {
          id: "date",
          type: "date",
          otherwise: "Invalid date",
        },
      ],
    });
  }

  async exec(message: Message, args: any): Promise<Message> {
    if (!message.util) throw new Error("undefined options");
    try {
      const scrims = await ScrimService.getFilteredScrims({
        region: args.region,
        platform: args.platform,
        srmin: args.srmin,
        srmax: args.srmax,
        date: args.date,
      });

      if (scrims.length == 0) {
        return message.util.send(`No scrim registered for those parameters`);
      } else {
        const scrimListFormater = new ScrimListFormater();
        return message.util.send(scrimListFormater.formatData(scrims));
      }
    } catch (e) {
      console.log(e);
      return message.util.send("invalid arguments");
    }
  }
}
