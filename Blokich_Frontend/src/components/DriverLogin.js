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
          setError("Vozač s navedenim brojem nepostoji!");
        }
      } catch (error) {
        console.error("Greška prilikom dohvaćanja podataka:", error);
        setError("Greška prilikom dohvaćanja podataka. Pokušajte ponovo.");
      }
    }
  };

  return (
    <div className="driver-login-container">
      <input
        type="text"
        onChange={handleDriverNumberChange}
        placeholder="Unesi broj vozača"
        className="driver-input"
      />
      <button onClick={handleLogin} className="login-button">
        Prijava
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DriverLogin;
