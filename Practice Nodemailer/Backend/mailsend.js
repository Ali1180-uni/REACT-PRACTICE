import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// FIXED: Added "async" keyword here
async function sendOtpEmail(to, sub, otp) {
    try {
        // FIXED: Added "await" so JavaScript pauses until the email delivers
        await transporter.sendMail({
            from: '"Ali App Verification" <kiraniko1552005@gmail.com>', // Good practice to include "from"
            to: to,
            subject: sub,
            text: `Your OTP is: ${otp}`,
        });

        console.log("Email successfully sent: %s", info.messageId);
    } catch (error) {
        console.error("Nodemailer internal crash error: ", error);
        throw error; // Throwing passes the error up to your Express try/catch block
    }
}

export { sendOtpEmail };
