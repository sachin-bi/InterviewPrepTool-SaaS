// model ready..!

import mongoose, { Schema, Document } from "mongoose";

export interface Interaction extends Document {
  prompt: string;
  response: string;
  createdAt?: Date; // made it optional
}

const InteractionSchema: Schema<Interaction> = new Schema({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isSubscribed: boolean;
  queryLeft: number;
  interactions: Interaction[]; // Renamed userInputOutput to interactions
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required..!"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required..!"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address.!"],
  },
  password: {
    type: String,
    required: [true, "Password is required..!"],
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  queryLeft: {
    type: Number,
    default: 4,
  },
  interactions: [InteractionSchema], // Using the defined InteractionSchema
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model("User", UserSchema);

export default UserModel;


