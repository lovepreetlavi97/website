import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userAPI";
import "./Login.css";

const Login = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
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
			console.log(response, "responseresponse");
			if (response.status == 200) {
				//  toast.success(`Your OTP has been sent to ${phoneNumber}`, {
				// 	position: "top-right",
				// });

        console.log(response.data.user.otp, "responseresponse");
        localStorage.setItem("authToken",response.data.user.token);
        localStorage.setItem("staticOtp",response.data.user.otp);
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
		<div className="login-page">
			<ToastContainer />
			<h2>Login</h2>
			<div className="login-input-container">
				<label>Phone Number:</label>
				<input
					type="text"
					value={phoneNumber}
					onChange={e => setPhoneNumber(e.target.value)}
					placeholder="Enter phone number"
				/>
				<button onClick={handleSendOtp}>Send OTP</button>
			</div>
		</div>
	);
};

export default Login;
