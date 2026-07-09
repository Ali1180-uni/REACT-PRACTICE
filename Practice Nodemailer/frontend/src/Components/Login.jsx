import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [email, setEmail] = useState("");
  
  // This state holds what the user types into the 4 boxes
  const [otp, setOtp] = useState(["", "", "", ""]);
  
  // FIXED: Added a state to safely remember the correct OTP string
  const [correctOtpString, setCorrectOtpString] = useState("");

  const createNewOtp = () => Math.floor(1000 + Math.random() * 9000);

  const sendOtp = async (email, otpString) => {
    try {
      // Sending the plain string version (e.g., "5821") to your backend
      await axios.post("http://localhost:3000/otp", { email, otp: otpString });
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // Handle Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // 1. Generate the fresh OTP code as a number
      const generatedNumber = createNewOtp();
      
      // 2. Convert it to a plain string (e.g., "4829")
      const generatedString = generatedNumber.toString();
      
      // 3. Save it to state so it stays locked in while typing
      setCorrectOtpString(generatedString);

      // 4. Send it to your backend API server
      sendOtp(email, generatedString);
      
      // 5. Jump to the 4-box screen
      setIsOtpStep(true);
    }
  };

  // Handle OTP Submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    
    // Combines the 4 input boxes into a single string (like "4829")
    const enteredOtp = otp.join("");
    
    // FIXED: Compare plain string to plain string safely!
    if (enteredOtp === correctOtpString) {
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP code. Please try again.");
    }
  };

  // Handle individual OTP box typing
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move focus to next input box automatically
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        {/* STEP 1: LOGIN COMPONENT */}
        {!isOtpStep ? (
          <div>
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Send Verification Code
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* STEP 2: OTP COMPONENT */
          <div>
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
                Enter OTP Code
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We sent a 4-digit code to{" "}
                <span className="font-semibold text-indigo-600">{email}</span>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
              <div className="flex justify-center gap-4">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    name="otp"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    className="h-12 w-12 rounded-lg border border-gray-300 text-center text-xl font-bold text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  />
                ))}
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Verify & Sign In
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOtpStep(false);
                    setOtp(["", "", "", ""]); // Reset boxes when going back
                  }}
                  className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
