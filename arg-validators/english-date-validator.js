// verifiy if the date match the YYYY-MM-DDD format

const EnglishDateValidator = {
  validate: stringDate => {
    const dateObject = new Date(stringDate + "T00:00:00");
    return isFinite(dateObject);
  },
  defaultErrorMessage: "Invalid date, YYYY-MM-DDD format expected."
};

module.exports = EnglishDateValidator;
