const GuildLeaveHandler = bot => {
  return guild => {
    console.log("Left a guild: " + guild.name);
  };
};

module.exports = GuildLeaveHandler;
