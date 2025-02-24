import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resendOtpAPI, verifyOtpAPI } from "../../api/userAPI";
import { Button, Card, CircularProgress, TextField } from "@mui/material";
import "./VerifyOtp.css";
import { useAuth } from "../../context/AuthContext";  // ✅ Import useAuth properly
import { useLoader } from "../../context/LoaderContext";


const VerifyOtp = () => {

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true); // Track first-time visit
  const [loading, setLoading] = useState(false); // To show loader on verify button
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneNumber } = location.state || {}; // Retrieve phone number
  const { login } = useAuth(); // Import useAuth
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
      setLoading(true); // Show loader while verifying OTP
      const response = await verifyOtpAPI(otp); // Verify OTP with backend
      console.log(response.status);
      if (response.status === 200) {
        // Store JWT token in local storage
    
        login(response.data.user, response.data.token); // ✅ Call login to update context
        toast.success("OTP Verified Successfully!", { position: "top-right" });
        setTimeout(() => navigate("/home"), 2000); // Redirect to home
      } else {
        toast.error(response?.message || "Invalid OTP. Please try again.", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Error verifying OTP. Please try again.", { position: "top-right" });
      console.error("Error during OTP verification:", error);
    } finally {
      setLoading(false); // Hide loader once done
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResendDisabled(true);
      setTimer(30); // Reset timer
      const response = await resendOtpAPI(phoneNumber); // Resend OTP API call
      if (response.status === 200) {
        toast.info(`Your OTP is ${response.data.otp}`, { position: "top-right" });
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
      <Card className="verify-card">
        <h2>Verify OTP</h2>
        <p>We have sent an OTP to {phoneNumber}</p>

        <div className="verify-input-container">
          <TextField
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            size="small"
            style={{ marginBottom: "20px" }}
          />

          <div className="button-container">
            <Button
              onClick={handleVerifyOtp}
              disabled={!otp || otp.length !== 4 || loading}
              variant="contained"
              color="primary"
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
            <Button
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              variant="text"
              color="secondary"
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              Resend OTP
            </Button>
          </div>

          <div>
            {timer > 0 ? (
              <p>OTP expires in {timer}s</p>
            ) : (
              <p>OTP expired. Please resend.</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VerifyOtp;
