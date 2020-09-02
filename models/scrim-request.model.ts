import mongoose, { Schema, Document } from "mongoose";
import { Platform } from "./platform-enum";
import { Region } from "./region-enum";

export interface DiscordUser {
  id: string;
  tag: string;
}

const DiscordUserSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

export interface CreateScrimRequest {
  teamName: string;
  region: Region;
  platform: Platform;
  srmin: number;
  srmax: number;
  owner: DiscordUser;
  datetime: any;
}

export interface ScrimRequest extends Document {
  teamName: string;
  region: Region;
  platform: Platform;
  srmin: number;
  srmax: number;
  owner: DiscordUser;
  datetime: any;
  candidates: DiscordUser[];
  validatedCandidate: DiscordUser;
}

const ScrimRequestSchema: Schema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 15,
    },
    region: {
      type: String,
      required: true,
      enum: Object.values(Region),
    },
    platform: {
      type: String,
      required: true,
      enum: Object.values(Platform),
    },
    srmin: {
      type: Number,
      required: true,
      min: [0, "cannot be lower than 0"],
      max: [5000, "cannot be greater than 5000"],
    },
    srmax: {
      type: Number,
      required: true,
      min: [0, "cannot be lower than 0"],
      max: [5000, "cannot be greater than 5000"],
    },
    owner: {
      type: DiscordUserSchema,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    candidates: [
      {
        type: DiscordUserSchema,
        required: false,
        default: [],
      },
    ],
    validatedCandidate: {
      type: DiscordUserSchema,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ScrimRequest>(
  "scrim-request",
  ScrimRequestSchema
);
