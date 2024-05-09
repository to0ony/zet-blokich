import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/common.css";

const Navbar = () => {
  const getBrojVozacaFromLocalStorage = () => {
    const brojVozaca = localStorage.getItem("brojVozaca");
    return brojVozaca ? brojVozaca : "defaultVrijednost";
  };

  const handleLogout = () => {
    localStorage.removeItem("brojVozaca");
  };

  const brojVozaca = getBrojVozacaFromLocalStorage();

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("brojVozaca");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to={`/driverprofile/${brojVozaca}`}>Raspored vožnje</Link>
          <Link to={`/driversOnLine/`}>Vozači na liniji</Link>
        </li>
        <li className="logout">
          <Link to={`/`} onClick={handleLogout}>
            Odjava
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
