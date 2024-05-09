import React from "react";
import "../style/driversonlinepage.css";

const VozaciNaLinijiTable = ({ drivers }) => {
  // Dohvati broj vozača iz lokalnog skladišta
  const storedDriverNumber = localStorage.getItem("brojVozaca");

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Broj vozača</th>
            <th>Prezime i ime</th>
            <th>Broj sluzbe</th>
            <th>Linija</th>
            <th>Od</th>
            <th>Do</th>
            <th>VR</th>
            <th>Nastup sluzbe</th>
            <th>Zavrsetak sluzbe</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.brojVozaca}>
              <td
                className={
                  driver.brojVozaca === storedDriverNumber
                    ? "boldBrojVozaca"
                    : ""
                }
              >
                {driver.brojVozaca}
              </td>
              {/* DA SE BOLDIRA ONAJ VOZAC KOJI JE LOGIRAN */}
              <td className="boldImePrezime">{driver.imePrezime}</td>
              <td>{driver.brojSluzbe}</td>
              <td>{driver.linija}</td>
              <td>{driver.od}</td>
              <td>{driver.do}</td>
              <td>{driver.vr}</td>
              <td>{driver.nastupSluzbe}</td>
              <td>{driver.zavrsetakSluzbe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VozaciNaLinijiTable;
