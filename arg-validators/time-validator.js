// verifiy if the time match the HH:MM format

const TimeValidator = {
  validate: stringTime => {
    const timeRegex = new RegExp(/^[0-9][0-9]:[0-9][0-9]$/);
    return timeRegex.test(stringTime);
  },
  defaultErrorMessage: "Invalid time, HH:MM format expected."
};

module.exports = TimeValidator;
