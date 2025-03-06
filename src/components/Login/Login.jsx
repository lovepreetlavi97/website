import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userAPI";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // import style
import "./Login.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default to India
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number", {
        position: "top-right",
      });
      return;
    }

    try {
      // Call the API to send OTP
      const response = await loginUser(phoneNumber);
      console.log(response, "response");

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.user.token);
        localStorage.setItem("staticOtp", response.data.user.otp);
        // Pass phoneNumber to the next page (using state)
        navigate("/verify-otp", { state: { phoneNumber } });
      } else {
        toast.error(response.message || "Failed to send OTP", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP", {
        position: "top-right",
      });
      console.error("Error during OTP send:", error);
    }
  };

  return (
   <div className="login-page-background">
	 <div className="login-page">
      <ToastContainer />
      <h2>Login</h2>
      <div className="login-input-container">
        <label>Phone Number:</label>
        <PhoneInput
          country={"in"} // Default to India
          value={phoneNumber}
          onChange={setPhoneNumber}
          inputStyle={{
            width: "100%",
            borderRadius: "25px",
            paddingLeft: "50px",
            height: "45px",
            fontSize: "16px",
            border: "1px solid #ddd",
          }}
          buttonStyle={{
            borderRadius: "25px 0 0 25px",
            border: "1px solid #ddd",
          }}
        />
        <div className="d-flex align-items-center justify-content-center">
          <button className="mt-3" onClick={handleSendOtp}>
            Send OTP
          </button>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Login;
