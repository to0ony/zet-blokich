import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getVozaciLinije } from "../services/api_vozaciLinije";
import Navbar from "../components/Navbar";
import VozaciNaLinijiTable from "../components/VozaciNaLinijiTable";
import "../style/driversonlinepage.css";

const DriversOnLinePage = () => {
  const { brojVozaca } = useParams();
  const [linijaId, setLinijaId] = useState("");
  const [danVoznje, setDanVoznje] = useState(getDefaultDay());
  const [vozaciLinije, setVozaciLinije] = useState(null);

  function getDefaultDay() {
    const days = ["ned", "pon", "uto", "sri", "cet", "pet", "sub"];
    const today = new Date().getDay();
    return days[today];
  }

  const handleInputChange = (event) => {
    setLinijaId(event.target.value);
  };

  const handleSelectChange = (event) => {
    setDanVoznje(event.target.value);
  };

  const handleSubmit = async () => {
    // Prije pretrage postavite vozaciLinije na null
    setVozaciLinije(null);
    try {
      const response = await getVozaciLinije(linijaId, danVoznje);
      setVozaciLinije(response);
    } catch (error) {
      console.error("Error fetching vozaci linije:", error);
    }
  };

  return (
    <div>
      <Navbar brojVozaca={brojVozaca} />
      <div className="drivers-on-line-container">
        <div className="label-inside">
          <label className="label" htmlFor="select">
            Odaberite dan:
          </label>
          <select
            className="select-dropdown"
            value={danVoznje}
            onChange={handleSelectChange}
            id="select"
            name="select"
          >
            <option value="pon">Ponedjeljak</option>
            <option value="uto">Utorak</option>
            <option value="sri">Srijeda</option>
            <option value="cet">Četvrtak</option>
            <option value="pet">Petak</option>
            <option value="sub">Subota</option>
            <option value="ned">Nedjelja</option>
          </select>
        </div>
        <br />
        <div className="label-inside">
          <label className="label">Unesite broj linije:</label>
          <input
            className="input-text"
            type="text"
            value={linijaId}
            onChange={handleInputChange}
          />
        </div>
        <button className="button" onClick={handleSubmit}>
          Pronađi vozače
        </button>
        <div>
          {vozaciLinije ? (
            <div>
              <VozaciNaLinijiTable drivers={vozaciLinije} />
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriversOnLinePage;
