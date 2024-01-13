import jwt from "jsonwebtoken";
import { Users } from "../models/Users.js";
import { OtpSchema } from "../models/OtpSchemma.js";
import bcrypt from "bcrypt";
import otpTemplate from "../templates/emailVerificationTemplate.js";
import { constants } from "../constants.js";

const SendOtp = async (email) => {
    try {

        var otp = otp_generator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        })

        let result = await OtpSchema.findOne({ otp });

        while (result) {
            otp = otp_generator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            })
            result = await Otp_model.findOne({ otp });
        }

        const response = await OtpSchema.create({
            email, otp
        })

        const mailResponse = await mailSender(email, "Verification Email from UrbanGrove", otpTemplate(otp));
        console.log("Mail response in auth ", mailResponse)
        return res.status(200).json({
            succcess: true,
            message: "Otp Sent Successfully ",
            email, otp
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const CreateUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        //check if user already exists in the database
        const ExistingUser = await Users.findOne({
            $or: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        })
        if (ExistingUser) {
            return res.status(500).json({
                status: false,
                message: "Email or Phone number is already registered",
            })
        }
        const Otp_Response=await SendOtp(email);
        if (!Otp_Response.success) {
            return res.status(500).json({
                status: false,
                message: Otp_Response.message + ' | Please Try Again Later'
            })
        }
        const recentOtp=await OtpSchema.findOne({email}).sort({createdAt:-1}).limit(1);
        if(recentOtp.otp.length==0){
            return res.status(500).json({
                succcess:false,
                message:"OTP not found",
            })
        }else if(otp!==recentOtp.otp){
            return res.status(500).json({
                succcess:false,
                message:"OTP Do not match ",
            })
        }
        const HashedPassword=await bcrypt.hash(password,10);
        
        const user=await Users.create({
            email:email,
            phoneNumber:phoneNumber,
            name:name,
            password:HashedPassword,
        })

        return res.status(200).json({
            success:true,
            message:"User is registered Succcessfully",
            user
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const LoginUser=async(req,res)=>{
    try{
        const {email,phoneNumber,password}=req.body;

        if(!email || !password || !phoneNumber){
            return res.status(500).json({
                success:false,
                message:'Please provide an Email and Password',
            })
        }
        const User=await Users.findOne({
            $or: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        })
        if(!User){
            return res.status(500).json({
                success:false,
                message:"User not found , You Need To Sign Up First",
            })
        }
        else{
            if(await bcrypt.compare(password,User.password)){
                const payload={
                    email:User.email,
                    id:User._id,
                }

                const token=jwt.sign(payload,constants.JWT_SECRET,{
                    expiresIn:"30d",
                })
                
                User.token=token
                User.password=undefined
                
                const options={
                    expiresIn:new Date(Date.now())+2*24*60*46*1000,
                }

                res.cookie("token",token,options).status(200).json({
                    succcess:true,
                    token,
                    User,
                    message:"User Logged in Successfully ",    
                })
            }
            else{
                return res.status(500).json({
                    succcess:false,
                    message:"Wrong Password Entered ",
                })
            }
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

export{
    CreateUser,
    LoginUser,
}
