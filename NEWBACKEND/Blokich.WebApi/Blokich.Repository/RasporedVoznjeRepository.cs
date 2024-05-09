using Blokich.Model;
using Blokich.Repository.Common;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blokich.Repository
{
    public class RasporedVoznjeRepository : IRasporedVoznjeRepository
    {
        private readonly string connString = "Server = 127.0.0.1;Port=5432;Database=Blokich ;User Id = postgres; Password=postgres;";

        public async Task<RasporedVoznje> GetRasporedVoznje(int brojVozaca)
        {
            RasporedVoznje rasporedVoznje = new RasporedVoznje();

            using (var conn = new NpgsqlConnection(connString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM disponent_19tj_2024 WHERE radnik = @brojVozaca", conn))
                {
                    cmd.Parameters.AddWithValue("brojVozaca", brojVozaca);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            rasporedVoznje.BrojVozaca = reader.GetInt32(0);
                            rasporedVoznje.pon = await GetSluzba(reader.GetString(1));
                            rasporedVoznje.uto = await GetSluzba(reader.GetString(2));
                            rasporedVoznje.sri = await GetSluzba(reader.GetString(3));
                            rasporedVoznje.cet = await GetSluzba(reader.GetString(4));
                            rasporedVoznje.pet = await GetSluzba(reader.GetString(5));
                            rasporedVoznje.sub = await GetSluzba(reader.GetString(6));
                            rasporedVoznje.ned = await GetSluzba(reader.GetString(7));
                        }
                    }
                }
            }
            return rasporedVoznje;
        }

        public async Task<IEnumerable<Sluzba>> GetSluzba(string brojSluzbe)
        {
            List<Sluzba> sluzbe = new List<Sluzba>();
            using (var conn = new NpgsqlConnection(connString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM sluzba WHERE brojsluzbe = @brojSluzbe", conn))
                {
                    cmd.Parameters.AddWithValue("brojSluzbe", brojSluzbe);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        // Ako nema redaka u rezultatu upita
                        if (!reader.HasRows)
                        {
                            Sluzba sluzba = new Sluzba();

                            sluzba.IsDriving = false;
                            switch (brojSluzbe)
                            {
                                case "I-GO":
                                case "O":
                                case "Oz":
                                case "I-BO":
                                case "Og":
                                case "I-DK":
                                case "I-BP":
                                case "I-PN":
                                case "Ob":
                                case "I-PD":
                                case "L":
                                    sluzba.BrojSluzbe = brojSluzbe;
                                    sluzbe.Add(sluzba);
                                    break;
                                default:
                                    sluzba.NastupSluzbe = "I-GO";
                                    sluzbe.Add(sluzba);
                                    break;
                            }
                        }
                        else // Ako ima redaka u rezultatu upita
                        {
                            while (reader.Read())
                            {
                                Sluzba sluzba = new Sluzba();

                                string currentBrojSluzbe = reader.GetString(0);

                                if (int.TryParse(currentBrojSluzbe, out _))
                                {
                                    sluzba.IsDriving = true;
                                    sluzba.BrojSluzbe = currentBrojSluzbe;
                                    sluzba.Linija = reader.GetString(1);
                                    if (!reader.IsDBNull(2))
                                    {
                                        sluzba.VR = reader.GetInt32(2);
                                    }
                                    else
                                    {
                                        sluzba.VR = null;
                                    }
                                    sluzba.NastupSluzbe = reader.GetString(3);
                                    sluzba.Od = reader.GetString(4);
                                    sluzba.Do = reader.GetString(5);
                                    sluzba.ZavrsetakSluzbe = reader.GetString(6);
                                }
                                sluzbe.Add(sluzba);

                            }
                        }
                    }
                }
            }
            return sluzbe;
        }

    }
}