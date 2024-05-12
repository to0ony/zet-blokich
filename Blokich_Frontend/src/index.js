import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Homepage from "./pages/Homepage";
import DriverPage from "./pages/Driverpage";
import "./style/common.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DriversOnLinePage from "./pages/DriversOnLinePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
      <Route path="/driverprofile/:brojVozaca" element={<DriverPage />} />
      <Route path="/driversOnLine" element={<DriversOnLinePage />} />
    </>
  )
);

const App = () => {
  // Provjera je li brojVozaca u lokalnom spremištu jednak defaultVrijednost
  const brojVozaca = localStorage.getItem("brojVozaca");
  useEffect(() => {
    if (brojVozaca === "defaultVrijednost") {
      router.navigate("/");
    }
  }, [brojVozaca]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
