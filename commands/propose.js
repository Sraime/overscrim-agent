const Enums = require("../tools/enums");
const ScrimRequestModel = require("../models/scrim-request.model");

module.exports = {
  name: "propose",
  description: "Propose matchup to a team.",
  parameters: [
    {
      name: "id",
      required: true,
      regex: "^[a-fd]{24}$"
    }
  ],
  execute(bot, message, args) {
    var start = new Date(args[3]);
    var end = new Date(args[3]);
    end.setHours(23, 59, 59, 99);
    ScrimRequestModel.find({
      _id: args[0]
    }).then(foundScrims => {
      if (foundScrims.lenght == 0) {
        throw new Error("No scrim found for id");
      }
      message.channel.send(Utils.generateScrimDisplay(foundScrims));
    });
  }
};
