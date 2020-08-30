const GuildJoinHandler = bot => {
  return guild => {
    console.log("Joined a new guild: " + guild.name);
    let defaultChannel = "";
    guild.channels.forEach(channel => {
      console.log(channel);
      if (channel.type == "text" && defaultChannel == "") {
        if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
          defaultChannel = channel;
        }
      }
    });
    const command = bot.commands.filter(c => c.name === "info")[0];
    command.execute(bot, defaultChannel, [], true);
  };
};

module.exports = GuildJoinHandler;
