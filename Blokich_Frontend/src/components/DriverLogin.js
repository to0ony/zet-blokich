import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVozac } from "../services/api_disponent";

const DriverLogin = () => {
  const [driverNumber, setDriverNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBrojVozaca = localStorage.getItem("brojVozaca");
    if (storedBrojVozaca) {
      setDriverNumber(storedBrojVozaca);
    }
  }, []);

  const handleDriverNumberChange = (event) => {
    setDriverNumber(event.target.value);
  };

  const handleLogin = async () => {
    if (driverNumber.trim() !== "") {
      try {
        const vozacData = await getVozac(driverNumber);
        if (vozacData.vozac !== 0) {
          setError(null);
          localStorage.setItem("brojVozaca", driverNumber);
          navigate(`/driverprofile/${driverNumber}`);
        } else {
          setError("Driver not found.");
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
        setError("Error fetching driver data. Please try again later.");
      }
    }
  };

  return (
    <div className="driver-login-container">
      <input
        type="text"
        onChange={handleDriverNumberChange}
        placeholder="Enter driver number"
        className="driver-input"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DriverLogin;
