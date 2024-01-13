import nodemailer from "nodemailer";
import { constants } from "../constants.js";

const mailSender=async(email,title,body)=>{
    try{
        const transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST, 
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD,
            }   
        })
        console.log(info);
        return info;
    }
    catch(err){
        console.log(err);
        console.error(err);
    }
}

export default mailSender;