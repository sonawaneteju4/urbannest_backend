import mongoose, { Schema } from "mongoose";

const contactUsSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

export const ContactUs = mongoose.model("ContactUs", contactUsSchema);