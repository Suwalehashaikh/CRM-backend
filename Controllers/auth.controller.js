import { Employee } from "../Models/employee.schema.js";
import { sendEmail } from "../Services/email.service.js";
import { otpTemplate } from "../template/otp.template.js";
import { customError } from "../Utils/customError.js";
import { success } from "../Utils/success.js";
import { generateAccessToken, generateRefreshToken } from "../Utils/token.js";
import bcrypt from "bcrypt";


//
export const authController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new customError(400, "All fields are required");
    }

    const user = await Employee.findOne({ email });
    if (!user) {
      throw new customError(400, "User not found");
    }

    // Password check
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new customError(400, "Invalid credentials");
    }

    // If user already verified → login
    if (user.isVerified === true) {
        const payload = { userId: user._id,role:user.role };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
     
      //sending refresh token in cookies
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return success(res, 200, "Login successful", {accessToken,userId: user._id});
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
// Get username from DB
const userName = user.name;

  // Set verification link
   const verifyLink = process.env.DOMAIN + "/verify";
    // Build HTML email using template function
   const content = otpTemplate(userName, otp, verifyLink);

    // Save OTP in DB
    user.otp = otp;
    await user.save();

    // Send OTP email
    await sendEmail(email, "OTP Verification", content);

    return success(res, 201, "OTP sent successfully. Check your email.");
  
};


// ====================== OTP CHECK CONTROLLER ======================

export const checkOtpController = async (req, res) => {
  console.log("REQ BODY:", req.body);

  
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new customError(400, "All fields are required");
    }

    const user = await Employee.findOne({ email });
    if (!user) {
      throw new customError(404, "User not found");
    }

    if (user.otp != otp) {
      throw new customError(401, "Invalid OTP");
    }

    user.otp = otp;
    user.isVerified = true;
    await user.save();

    const payload = { userId: user._id,role:user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return success(res, 200, "OTP verified successfully", accessToken);
};

//generatee access token
export const refreshAccessToken = async (req,res)=>{
  const {refreshToken} = req.cookies
  console.log(refreshToken)
  if(!refreshToken){
    throw new customError(403,"Refresh Token not found")
  }
  const decoded = Jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY)
  if(!decoded){
    throw new customError(403,"Refresh token Expired")
  }
  const payload = {userId: decoded.user_id,role: decoded.role}
  const newAccessToken = generateAccessToken(payload)
  success(res,200,"new accesss token generated", newAccessToken)
}
  ///get user  data for user controller
  export const getUserData = async (req,res)=>{
    const {userId} = req.params
    if(!userId){
     throw new customError(400, "No user Id found")
    }
    const userDetails = await Employee.findById(userId).populate("students")
    if(!userDetails){
      throw new customError(400, "No user found")
    }
    const data = {name:userDetails.name, email:userDetails.email, phone:userDetails.phone,Students:userDetails.students}
    success(res,200, "User data fetched successfully", data)
  }