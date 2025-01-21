import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resendOtpAPI, verifyOtpAPI } from "../../api/userAPI";
import "./VerifyOtp.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(2);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true); // Track first-time visit
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneNumber } = location.state || {}; // Retrieve phone number
  useEffect(() => {
    // Show OTP toast only on first visit
    if (isFirstVisit) {
      const savedOtp = localStorage.getItem("staticOtp");
      toast.info(`Your OTP is ${savedOtp}`, { position: "top-right" });
      setIsFirstVisit(false); // Ensure it doesn't show again
    }
  }, [isFirstVisit]);


  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval); // Cleanup the interval
  }, [timer]);

  const handleVerifyOtp = async () => {
    try {
      if (!otp) {
        toast.error("Please enter the OTP.", { position: "top-right" });
        return;
      }
  console.log(otp,"otpppppppppppp")
      const response = await verifyOtpAPI(otp); // Verify OTP with backend
      console.log(response, 'responseresponseresponse');
  
      // Assuming response structure: { status: 200, message: "OTP verified", token: "jwt-token" }
      if (response?.status === 200) {
        // Store JWT token in local storage
        localStorage.setItem("authToken", response.token);
        toast.success("OTP Verified Successfully!", { position: "top-right" });
        setTimeout(() => navigate("/home"), 2000); // Redirect to home
      } else {
        toast.error(response?.message || "Invalid OTP. Please try again.", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Error verifying OTP. Please try again.", { position: "top-right" });
      console.error("Error during OTP verification:", error);
    }
  };
  

  const handleResendOtp = async () => {
    try {
      setIsResendDisabled(true);
      setTimer(30); // Reset timer
      const response = await resendOtpAPI(phoneNumber); // Resend OTP API call
      if (response.status === 200) {
   
    console.log(response.data.otp,"responseresponseresponseresponseresponse")
        toast.info(`Your OTP is ${response.data.otp}`, { position: "top-right" });
        // toast.success("OTP has been resent successfully.", { position: "top-right" });
      } else {
        toast.error(response.message || "Failed to resend OTP", { position: "top-right" });
      }
      setTimeout(() => setIsResendDisabled(false), 5000); // Disable resend for 5 seconds
    } catch (error) {
      toast.error("Error resending OTP. Please try again.", { position: "top-right" });
      console.error("Error during OTP resend:", error);
    }
  };

  return (
    <div className="verify-page">
      <ToastContainer />
      <h2>Verify OTP</h2>
      <p>We have sent an OTP to {phoneNumber}</p>
      <div className="verify-input-container">
        <label>Enter OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button onClick={handleVerifyOtp}>Verify OTP</button>
        <div>
          {timer > 0 ? (
            <p>OTP expires in {timer}s</p>
          ) : (
            <button onClick={handleResendOtp} disabled={isResendDisabled}>
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
