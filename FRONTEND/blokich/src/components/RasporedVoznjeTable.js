import React from "react";

const RasporedVoznjeTable = ({ scheduleData }) => {
  // Definiraj listu dana
  const days = [
    { name: "Ponedjeljak", key: "pon" },
    { name: "Utorak", key: "uto" },
    { name: "Srijeda", key: "sri" },
    { name: "Četvrtak", key: "cet" },
    { name: "Petak", key: "pet" },
    { name: "Subota", key: "sub" },
    { name: "Nedjelja", key: "ned" },
  ];

  return (
    <div className="raspored-voznje">
      <h2>Broj vozača: {scheduleData.brojVozaca}</h2>
      {days.map((day, index) => (
        <div key={index} className="raspored-voznje-dan">
          <h2>{day.name}:</h2>
          <table className="raspored-voznje-tablica">
            <thead>
              <tr
                className={
                  day.name === "Subota"
                    ? "red-subota"
                    : day.name === "Nedjelja"
                    ? "red-nedjelja"
                    : "red"
                }
                onClick={console.log(day)}
              >
                <th className="broj-sluzbe-header">
                  {scheduleData[day.key][0].isDriving === true
                    ? "Broj Sluzbe"
                    : "Slobodan"}
                </th>
                {scheduleData[day.key].some((item) => item.isDriving) && (
                  <>
                    <th className="linija-header">Linija</th>
                    <th className="vr-header">Vr</th>
                    <th className="nastup-sluzbe-header">Nastup Sluzbe</th>
                    <th className="od-header">Od</th>
                    <th className="do-header">Do</th>
                    <th className="zavrsetak-sluzbe-header">
                      Zavrsetak Sluzbe
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Koristi ključ dana za pristup odgovarajućem rasporedu */}
              {scheduleData[day.key].map((item, itemIndex) => (
                <tr key={itemIndex} className="raspored-voznje-red">
                  <td className="broj-sluzbe-cell">{item.brojSluzbe}</td>
                  {item.isDriving && (
                    <>
                      <td className="linija-cell">{item.linija}</td>
                      <td className="vr-cell">{item.vr}</td>
                      <td className="nastup-sluzbe-cell">
                        {item.nastupSluzbe}
                      </td>
                      <td className="od-cell">{item.od}</td>
                      <td className="do-cell">{item.do}</td>
                      <td className="zavrsetak-sluzbe-cell">
                        {item.zavrsetakSluzbe}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default RasporedVoznjeTable;
