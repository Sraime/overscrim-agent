const ServerReadyHandler = bot => {
  return () => {
    console.info(`Logged in as ${bot.user.tag}!scrim-`);
  };
};

module.exports = ServerReadyHandler;
