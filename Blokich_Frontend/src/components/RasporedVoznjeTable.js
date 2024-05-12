import React from "react";
import { format, addDays } from "date-fns";

const RasporedVoznjeTable = ({ scheduleData }) => {
  // Definiraj listu dana
  console.log(scheduleData);
  const days = [
    { name: "Ponedjeljak", key: "pon" },
    { name: "Utorak", key: "uto" },
    { name: "Srijeda", key: "sri" },
    { name: "Četvrtak", key: "cet" },
    { name: "Petak", key: "pet" },
    { name: "Subota", key: "sub" },
    { name: "Nedjelja", key: "ned" },
  ];

  // Funkcija za dobivanje datuma ponedjeljka u tjednu
  const getMondayDate = () => {
    const januaryFirst = new Date(scheduleData.godina, 0, 1);
    const daysOffset = 1 - januaryFirst.getDay();
    const firstMonday = new Date(
      scheduleData.godina,
      0,
      1 + daysOffset + 7 * (scheduleData.tjedan_u_godini - 1)
    );
    return firstMonday;
  };

  return (
    <div className="raspored-voznje">
      <center>
      <h3 className={"driver-number"}>Broj vozača: {scheduleData.brojVozaca}</h3>
      </center>
        {days.map((day, index) => {
        // Dobivanje datuma za trenutni dan u tjednu
        const mondayDate = getMondayDate();
        const currentDate = addDays(mondayDate, index);

        return (
          <div key={index} className="raspored-voznje-dan">
            <div key={index} className="raspored-voznje-dan">
              <div className="day-name">{day.name}</div>
              <div className="date">{format(currentDate, "dd.MM.yyyy")}</div>
            </div>
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
        );
      })}
    </div>
  );
};

export default RasporedVoznjeTable;
