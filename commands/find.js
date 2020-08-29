const Enums = require("../enums");
const ScrimRequestModel = require("../models/scrim-request.model");

function DateToString(date) {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${("0" + date.getMinutes()).slice(
    -2
  )} `;
}

module.exports = {
  name: "find",
  description: "Find a scrim based on region, platform, SR and date.",
  usage: "<region> <platform> <sr> <YYYY-MM-JJ>",
  numberOfArguments: 4,
  execute(bot, message, args) {
    //'[EU|NA|AS] [PC|SWITCH] [SR] mm/dd'
    const region = args[0];
    const platform = args[1];
    const sr = parseInt(args[2], 10);
    const day = args[3];

    if (Enums.PLATFORM.indexOf(platform) === -1) {
      throw new Error(
        "Invalid platform, the available platforms are: " +
          Enums.PLATFORM.join(" | ")
      );
    }
    if (Enums.REGION.indexOf(region) === -1) {
      throw new Error(
        "Invalid region, the available regions are: " + Enums.REGION.join(" | ")
      );
    }
    if (isNaN(sr) || (0 <= sr && sr >= 5000)) {
      throw new Error(
        "Invalid SR number, please insert a number between 0 and 5000"
      );
    }
    const requestedDatetime = new Date(day + "T00:00:00");
    if (!isFinite(requestedDatetime)) {
      throw new Error("Invalid date, expected format YYYY-MM-JJ");
    }

    const scrims = ScrimRequestModel.find()
      .then((foundScrims) => {
        if (foundScrims.length === 0) {
          message.channel.send(
            `No scrim found for parameters ${region}, ${platform}, ${sr}, ${day}`
          );
        }
        const scrimsRender = [];
        foundScrims.forEach((scrim) => {
          scrimsRender.push(
            `Team **${scrim.teamName}** - ${scrim.region}, ${scrim.platform}, ${
              scrim.srmin
            }-${scrim.srmax}, ${DateToString(scrim.datetime)} - contact ${
              scrim.discordOwnerTag
            }`
          );
        });
        message.channel.send(scrimsRender.join("\n"));
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  },
};
