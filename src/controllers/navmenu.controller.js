import mongoose from "mongoose";
import { NavItems } from "../model/navmenu.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getNavItem = asyncHandler(async (req, res) => {
  try {
    const navItem = await NavItems.find().sort({ $natural: 1 });
    res.json(navItem);
    new ApiResponse(200, navItem, "NavItem registered Successfully");
  } catch (error) {
    console.log(error)
    throw new ApiError(500, "Something went wrong while getting Nav Items");
  }
});

const addNavItem = asyncHandler(async (req, res) => {
  const { navName, navPath, accessLevel, status, icon } = req.body;
  if ([navName,  accessLevel].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const navItemExist = await NavItems.findOne({
    $or: [{ navName }],
  });

  if (navItemExist) {
    throw new ApiError(409, "NavItem already Exists");
  }
  try {
    const navItem = await NavItems.create({
      navName: navName.charAt(0).toUpperCase() + navName.slice(1),
      navPath: navPath.toLowerCase() || "/",
      accessLevel,
      status: status || true,
      icon
    });
    return res
      .status(201)
      .json(new ApiResponse(200, navItem, "User registered Successfully"));
  } catch (error) {
    console.log(error)
    throw new ApiError(500, "Something went wrong while Creating Nav Item")

  }
});
const updateNavItem = asyncHandler(async (req, res) => {
  //TODO: Add NavItem tweet
});

const deleteNavItem = asyncHandler(async (req, res) => {});

export { getNavItem, addNavItem, updateNavItem, deleteNavItem };
