const mongoose = require("mongoose");
const { isAlphanumeric } = require("validator");

const scrimRequestSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 15,
      validate: [isAlphanumeric, "only letters and numbers"]
    },
    region: {
      type: String,
      required: true,
      enum: ["EU", "NA"]
    },
    platform: {
      type: String,
      required: true,
      enum: ["PC", "SWITCH", "PS4", "XBOX"]
    },
    srmin: {
      type: Number,
      required: true,
      min: [0, "cannot be lower than 0"],
      max: [5000, "cannot be greater than 5000"]
    },
    srmax: {
      type: Number,
      required: true,
      min: [0, "cannot be lower than 0"],
      max: [5000, "cannot be greater than 5000"]
    },
    discordOwnerId: {
      type: String,
      required: true
    },
    discordOwnerTag: {
      type: String,
      required: true
    },
    datetime: {
      type: Date,
      required: true
    },
    candidates: [
      {
        type: String,
        required: false,
        default: []
      }
    ],
    CanditateValidated: {
      type: String,
      required: false,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("scrim-request", scrimRequestSchema);
