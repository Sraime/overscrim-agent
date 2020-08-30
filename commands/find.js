const Enums = require("../tools/enums");
const ScrimRequestModel = require("../models/scrim-request.model");
const EnglishDateValidator = require("../arg-validators/english-date-validator");
const Utils = require("../tools/utils");

module.exports = {
  name: "find",
  name: "fublishind",
  description: "Register your scrim to be contacted by other teams.",
  parameters: [
    {
      name: "region",
      required: true,
      regex: "^(" + Enums.REGION.join("|") + ")$",
      regexHelper: Enums.REGION.join(", ")
    },
    {
      name: "platform",
      required: true,
      regex: "^(" + Enums.PLATFORM.join("|") + ")$",
      regexHelper: Enums.PLATFORM.join(", ")
    },
    {
      name: "sr-min",
      required: true,
      regex:
        "^0*([0-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-4][0-9]{3}|5000)$", // between 0 and 5000
      regexHelper: "between 0 and 5000"
    },
    {
      name: "sr-max",
      required: true,
      regex:
        "^0*([0-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-4][0-9]{3}|5000)$", // between 0 and 5000
      regexHelper: "between 0 and 5000"
    },
    {
      name: "day",
      required: true,
      validators: [
        {
          validator: EnglishDateValidator,
          message: "Invalid date, YYYY-MM-DD format expected."
        }
      ],
      isDate: true
    },
    {
      name: "time",
      required: true,
      regex: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
      regexHelper: "HH:MM"
    },
    {
      name: "teamName",
      required: true,
      regex: "^[a-zA-Z0-9]*$",
      regexHelper: "Your team's name (no spaces)"
    }
  ],
  execute(bot, message, args) {
    const nsr = new ScrimRequestModel({
      teamName: args[0],
      region: args[1],
      platform: args[2],
      srmin: args[3],
      srmax: args[4],
      datetime: new Date(args[5] + "T" + args[6] + ":00"),
      discordOwnerId: message.author.id,
      discordOwnerTag: message.author.tag
    });
    const errors = nsr.validateSync();
    if (errors) {
      console.log(errors.message);
      throw new Error(errors.message);
    }
    nsr.save().then(() => {
      var start = new Date(args[5]);
      var end = new Date(args[5]);
      end.setHours(23, 59, 59, 99);
      ScrimRequestModel.find({
        region: args[1],
        platform: args[2],
        $and: [
          { srmin: { $lte: Number(args[3]) } },
          { srmax: { $gte: Number(args[4]) } }
        ],
        datetime: {
          $gte: start.toISOString(),
          $lte: end.toISOString()
        }
      }).then(foundScrims => {
        if (foundScrims.length == 0) {
          message.channel.send(`No scrim registered for those parameters`);
        } else {
          message.channel.send(Utils.generateScrimDisplay(foundScrims));
          const filter = m => m.content.includes("discord");
          const collector = message.channel.createMessageCollector(filter, {
            time: 15000
          });
          collector.on("collect", m => {
            console.log(`Collected ${m.content}`);
            collector.end();
          });
        }
      });
      // NOP message.channel.send("Scrim registered
      // TODO: afficher la list des scrim correspond à la recherms
    });
  }
};
