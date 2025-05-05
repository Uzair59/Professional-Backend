import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloundiary from "../utils/cloudinary.js";


const registerUser = asyncHandler(async (req, res) => {
  //get user detail from frontend
  //validations - not empty
  //check if user already exist: username or email
  //check for images or avatar
  //upload them to cloudinary, avatar
  //create user ojbect - create entry in db
  //remove  password and refresh token  field  from repsonse
  //check for user creation
  //return response
  //error

  const { userName, fullName, email, password } = req.body;
  if (
    [userName, fullName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required")
  }

  const existedUser= User.findOne({
    $or: [{userName}, {email}]
  })

  if(existedUser){
     throw new ApiError(409, "User with email and username already exist")
  }

  const avatarLocalPath= req.files?.avatar[0]?.path;
  const coverImgLocalPath= req.files?.coverImg[0]?.path;
 
  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar= await uploadOnCloundiary(avatarLocalPath)
  const coverImg= await uploadOnCloundiary(coverImgLocalPath)

  if(!avatar){
    throw new ApiError(400, "Avatar file is required")
  }

  const user= await User.create({
    fullName,
    avatar: avatar.url,
    coverImg: coverImg?.url || "",
    email, 
    password,
    userName: userName.toLowerCase()
  })

  const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User Registered Succesfully")
  )
  
});

export default registerUser;
