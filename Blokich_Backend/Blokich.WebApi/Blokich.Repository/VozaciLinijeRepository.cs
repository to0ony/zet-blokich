using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Blokich.Model;
using Blokich.Model.Common;
using Blokich.Repository.Common;
using Npgsql;

namespace Blokich.Repository
{
    public class VozaciLinijeRepository : IVozaciLinijeRepository
    {
        private readonly string connString = "Server=127.0.0.1;Port=5432;Database=Blokich;User Id=postgres;Password=postgres;";

        public async Task<IEnumerable<VozaciLinije>> GetVozaceLinije(int brojLinije, string danVoznje)
        {
            List<VozaciLinije> vozaciLinije = new List<VozaciLinije>();

            string formattedDay = DayChecker(danVoznje);

            using (var conn = new NpgsqlConnection(connString))
            {
                conn.Open();

                using (var cmd = new NpgsqlCommand($"SELECT r.radnik, v.imeprezime, s.* FROM disponent_19tj_2024 r INNER JOIN sluzba s ON r.{formattedDay} = s.BrojSluzbe INNER JOIN vozaci v ON r.radnik = v.brojvozaca WHERE s.linija = @BrojLinije::text ORDER BY od", conn))
                {
                    cmd.Parameters.AddWithValue("@BrojLinije", brojLinije);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            VozaciLinije vozac = new VozaciLinije();
                            vozac.BrojVozaca = reader.GetInt32(0);
                            vozac.ImePrezime = reader.GetString(1).ToLower();
                            vozac.BrojSluzbe = reader.GetString(2);
                            vozac.Linija = reader.GetString(3);
                            vozac.VR = reader.GetInt32(4);
                            vozac.NastupSluzbe = reader.GetString(5);
                            vozac.Od = reader.GetString(6);
                            vozac.Do = reader.GetString(7);
                            vozac.ZavrsetakSluzbe = reader.GetString(8);

                            vozaciLinije.Add(vozac);
                        }
                    }
                }
            }
            return vozaciLinije;
        }

        public string DayChecker(string danVoznje)
        {
            if(danVoznje != null)
                danVoznje = danVoznje.ToLower();

            if (new List<string> { "pon", "uto", "sri", "cet", "pet", "sub", "ned" }.Contains(danVoznje))
            {
                return danVoznje;
            }
            else
            {
                DateTime danas = DateTime.Today;
                switch (danas.DayOfWeek)
                {
                    case DayOfWeek.Monday:
                        danVoznje = "pon";
                        break;
                    case DayOfWeek.Tuesday:
                        danVoznje = "uto";
                        break;
                    case DayOfWeek.Wednesday:
                        danVoznje = "sri";
                        break;
                    case DayOfWeek.Thursday:
                        danVoznje = "cet";
                        break;
                    case DayOfWeek.Friday:
                        danVoznje = "pet";
                        break;
                    case DayOfWeek.Saturday:
                        danVoznje = "sub";
                        break;
                    case DayOfWeek.Sunday:
                        danVoznje = "ned";
                        break;
                }
            }
            return danVoznje;
        }
    }
}
