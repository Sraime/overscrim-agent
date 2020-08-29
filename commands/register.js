const ScrimRequestModel = require("../models/scrim-request.model");

module.exports = {
  name: "register",
  description: "Register your scrim to be contacted by other teams.",
  usage:
    "<teamName> <region> <platform> <sr-min> <sr-max> <YYYY-MM-JJ> <HH:MM>",
  numberOfArguments: 7,
  execute(bot, message, args) {
    const requestedDatetime = new Date(args[5] + "T" + args[6] + ":00");
    if (!isFinite(requestedDatetime)) {
      throw new Error("Invalid date, expected format YYYY-MM-JJ HH:MM");
    }

    if (parseInt(args[3], 10) > parseInt(args[4], 10)) {
      throw new Error(
        "Invalid SR range, <sr-min> can't be greater than <sr-max>"
      );
    }

    const nsr = new ScrimRequestModel({
      teamName: args[0],
      region: args[1],
      platform: args[2],
      srmin: args[3],
      srmax: args[4],
      datetime: new Date(args[5] + "T" + args[6] + ":00"),
      discordOwnerId: message.author.id,
      discordOwnerTag: message.author.tag,
    });
    const errors = nsr.validateSync();
    if (errors) {
      console.log(errors.message);
      throw new Error(errors.message);
    }
    nsr.save().then(() => {
      message.channel.send("Scrim registered !");
    });
  },
};
