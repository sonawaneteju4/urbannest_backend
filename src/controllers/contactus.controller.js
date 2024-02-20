import { ContactUs } from "../model/contactus.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addContactUs = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if ([name, email, subject, message].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  try {
    const contactus = await ContactUs.create({
      name,
      email: email.toLowerCase(),
      subject,
      message,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, contactus, "Contact Us Message Send Successfully"));
  } catch (error) {
    console.log(error)
    throw new ApiError(500, "Something went wrong while Creating Contact us")
  }
});
const getContactUs = asyncHandler(async (req, res) => {});

export {getContactUs , addContactUs}