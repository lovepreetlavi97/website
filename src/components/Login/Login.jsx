import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TextField, InputAdornment, Button, Card, CircularProgress } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { loginUser } from "../../api/userAPI"; // Ensure the login API function is correct
import "./Login.css";
import { useNavigate } from "react-router-dom";

// Function to fetch country details from API
const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data
      .map((country) => ({
        value: country.cca2,
        label: `${country.flag || "🏳"} ${country.name.common} (+${
          country.idd.root || ""
        }${country.idd.suffixes ? country.idd.suffixes[0] : ""})`,
        code: `${country.idd.root || ""}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`,
      }))
      .filter((country) => country.code);
  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
};

const PhoneNumberLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetching countries on component mount
  useEffect(() => {
    fetchCountries().then((countryOptions) => {
      setCountries(countryOptions);
      setSelectedCountry(countryOptions.find((c) => c.value === "IN") || countryOptions[0]);
    });
  }, []);

  // Function to handle login with phone number
  const handleLogin = async () => {
    setIsLoading(true);  // Show loading spinner
    setError("");        // Clear any previous errors
    const phoneWithoutCountryCode = phone.replace(`+${selectedCountry.code}`, "").trim();
    const countryCode = `+${selectedCountry.code}`;
    console.log("Phone:", phoneWithoutCountryCode, "Country Code:", countryCode);
    try {
      const response = await loginUser({
        phoneNumber: phoneWithoutCountryCode,
        countryCode: countryCode,
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.user.token);
        localStorage.setItem("staticOtp", response.data.user.otp);
        navigate("/verify-otp", { state: { phoneNumber: phone } });
      } else {
        toast.error(response.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP");
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Hide loading spinner after API call
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <h2>Login with Phone</h2>
        
        <div className="phone-input-container">
          <PhoneInput
            country={selectedCountry?.value.toLowerCase() || "in"}
            enableSearch={true}
            value={phone}
            onChange={setPhone}
            inputStyle={{
              width: "100%",
              border: "none",
              background: "transparent",
              fontSize: "18px",
              color: "#333",
            }}
          />
        </div>



        {/* Show error message */}
        {error && <div className="error-message">{error}</div>}

        <Button onClick={handleLogin} disabled={!phone || isLoading} variant="contained" color="primary">
          {isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>

        {/* ToastContainer for notifications */}
        <ToastContainer />
      </Card>
    </div>
  );
};

export default PhoneNumberLogin;
