const Enums = require("../tools/enums");
const ScrimRequestModel = require("../models/scrim-request.model");
const Utils = require("../tools/utils");

module.exports = {
  name: "agenda",
  description: "Find my registered scrim",
  parameters: [],
  execute(bot, message, args) {
    ScrimRequestModel.find({
      discordOwnerId: message.author.id
    }).then(foundScrims => {
      message.channel.send(Utils.generateScrimDisplay(foundScrims));
    });
  }
};
