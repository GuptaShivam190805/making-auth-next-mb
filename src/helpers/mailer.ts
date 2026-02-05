import nodemailer from "nodemailer";
import User from "@/model/userModel.js";
import bcrypt from "bcryptjs";


export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        //create a hased token
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        
        if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
        })    
        }else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
        })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_ID,
                pass: process.env.MAILER_PASSWORD
            }
        });

     const path =
  emailType === "VERIFY" ? "verifyemail" : "resetpassword";

const url = `${process.env.DOMAIN}/${path}?token=${hashedToken}`;

const mailOptions = {
  from: "ShivamGupta@gmail.com",
  to: email,
  subject:
    emailType === "VERIFY"
      ? "Verify your email"
      : "Reset your password",
  html: `
    <p>
      Click <a href="${url}">here</a> to ${
        emailType === "VERIFY"
          ? "verify your email"
          : "reset your password"
      }.
      <br/><br/>
      Or copy this link into your browser:<br/>
      ${url}
    </p>
  `,
};
        
        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse

    } catch (error:any) {
        throw new Error(error.message);
    }
}