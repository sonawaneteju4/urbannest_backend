import mongoose, { Schema } from "mongoose";

const navSchema = new Schema({
  navName: {
    type: String,
    require: true,
  },
  navPath: {
    type: String,
  },
  accessLevel: {
    type: String,
    require: true,
  },
  possition: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
    require: true,
  },
  icon : { 
    type: Object, 
    require: true 
  },
});

export const NavItems = mongoose.model("NavItems", navSchema);
