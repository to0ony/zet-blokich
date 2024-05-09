import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RasporedVoznjeTable from "../components/RasporedVoznjeTable";
import { getRasporedVoznje } from "../services/api_rasporedvoznje";
import "../style/driverpage.css";
import Navbar from "../components/Navbar";

const DriverPage = () => {
  const { brojVozaca } = useParams();
  const [rasporedVoznje, setRasporedVoznje] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRasporedVoznje = async () => {
      try {
        const response = await getRasporedVoznje(brojVozaca);
        setRasporedVoznje(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching raspored vožnje:", error);
      }
    };

    fetchRasporedVoznje();
  }, [brojVozaca]);

  useEffect(() => {}, [rasporedVoznje]);

  return (
    <div>
      <Navbar brojVozaca={brojVozaca} />
      <div className="driver-page-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <RasporedVoznjeTable scheduleData={rasporedVoznje} />
        )}
      </div>
    </div>
  );
};

export default DriverPage;
