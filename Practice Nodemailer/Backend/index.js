import express from "express";
import cors from "cors";
import { sendOtpEmail } from "./mailsend.js";

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173",
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hi this is Me (Ali) ");
})

app.post("/otp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        await sendOtpEmail(email, "Your OTP Code", otp);
        console.log(`OTP (${otp}) sent successfully to ${email}`);
        return res.status(200).json({ success: true, message: "OTP sent successfully!" });

    } catch (error) {
        console.error("Backend failed to send email:", error);
        return res.status(500).json({ success: false, message: "Failed to send email." });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});