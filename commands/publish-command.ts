import { Argument, Command } from "discord-akairo";
import { Message } from "discord.js";
import { Platform } from "../models/platform-enum";
import { Region } from "../models/region-enum";
import { ScrimService } from "../services/scrim-service";
import { SelfDescribedCommand } from "./self-described-command";

const regionList = Object.values(Region);
const platformList = Object.values(Platform);

export default class PublishCommand extends SelfDescribedCommand {
  public constructor() {
    super("publish", {
      aliases: ["publish"],
      category: "Public Commands",
      description: {
        content: "Publish a new scrim to be contacted by other teams",
        usage: "publish",
        example: ["publish"],
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
        {
          id: "time",
          type: "time",
          otherwise: "Invalid time",
        },
        {
          id: "teamName",
          type: "string",
          otherwise: "Invalid team name.",
        },
      ],
    });
  }

  async exec(message: Message, args: any): Promise<Message> {
    if (!message.util) throw new Error("undefined options");
    const datetime: Date = args.date;
    datetime.setHours(args.time.hours);
    datetime.setMinutes(args.time.minutes);
    try {
      await ScrimService.createScrim({
        region: args.region,
        platform: args.platform,
        srmin: args.srmin,
        srmax: args.srmax,
        datetime: datetime,
        owner: {
          id: message.author.id,
          tag: message.author.username + "#" + message.author.discriminator,
        },
        teamName: args.teamName,
      });
      return message.util.send("scrim created !");
    } catch (e) {
      console.log(e);
      return message.util.send("invalid arguments");
    }
  }
}
