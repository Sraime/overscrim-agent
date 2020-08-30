module.exports = {
  dateToString(date) {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${date.getDate()} ${date.getHours()}:${("0" + date.getMinutes()).slice(
      -2
    )} `;
  },
  isValidDate(date) {
    var date2 = new Date(date).toISOString().split("T")[0];
    return date === date2;
  },
  showParamUsage(message, commandName, declaredParams) {
    message = "!scrim-" + commandName;
    declaredParams.forEach(declaredParam => {
      message += " <" + declaredParam.name + ">";
    });
    message.channel.send(declaredParams.join("\n"));
  },
  validateParams(command, params) {
    const declaredParams = command.parameters;
    if (params.length > declaredParams.length) {
      throw new Error("Too many parameters");
    }
    for (let i = 0; i < declaredParams.length; i++) {
      if (!params[i]) {
        if (!declaredParams[i].required) {
          break; // end of required params, exit for
        }
        throw new Error(
          "Missing parameter " +
            declaredParams[i].name +
            ", expected regex: " +
            declaredParams[i].regexHelper
        );
      }
      if (declaredParams[i].isDate) {
        if (!this.isValidDate(params[i])) {
          throw new Error(
            "Invalid date parameter " +
              declaredParams[i].name +
              ", expected format: format YYYY-MM-JJ"
          );
        }
      } else {
        regex = RegExp(declaredParams[i].regex);
        if (!regex.test(params[i])) {
          throw new Error(
            "Invalid input for parameter " +
              declaredParams[i].name +
              ", expected format: " +
              declaredParams[i].regexHelper
          );
        }
      }
    }
  },
  generateScrimDisplay(scrims) {
    if (scrims.length == 0) {
      return `No scrim registered`;
    }
    const scrimsRender = [];
    scrims.forEach(scrim => {
      scrimsRender.push(
        `Team **${scrim.teamName}** - ${scrim.region}, ${scrim.platform}, ${
          scrim.srmin
        }-${scrim.srmax}, ${this.dateToString(scrim.datetime)} - status: ${
          scrim.CanditateValidated
            ? scrim.CanditateValidated
            : scrim.candidates.length > 0
            ? scrim.candidates.length +
              "candidated (" +
              scrim.candidates.join(",") +
              ")"
            : "Waiting candidates - id " + scrim._id
        }`
      );
    });
    scrimsRender.push(
      "**Candidate to a scrim with `!scrim-candidate <ID>` or publish  yours with `!scrim-publish NA PS4 100 500 2020-03-28 <HH:MM> <TEAMNAME>`**"
    );
    return scrimsRender.join("\n");
  }
};
