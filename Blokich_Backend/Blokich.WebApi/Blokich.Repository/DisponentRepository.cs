using Blokich.Model;
using Blokich.Repository.Common;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Blokich.Repository
{
    public class DisponentRepository : IDisponentRepository
    {
        private readonly string connString = "Server = 127.0.0.1;Port=5432;Database=Blokich ;User Id = postgres; Password=postgres;";

        public async Task<Vozac> GetDriverById(int brojVozac)
        {
            Vozac vozac = new Vozac();
            using (var conn = new NpgsqlConnection(connString))
            {
                conn.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM disponent WHERE radnik = @brojVozac", conn))
                {
                    cmd.Parameters.AddWithValue("brojVozac", brojVozac);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            vozac.vozac = reader.GetInt32(0);
                            vozac.pon = reader.GetString(1);
                            vozac.uto = reader.GetString(2);
                            vozac.sri = reader.GetString(3);
                            vozac.cet = reader.GetString(4);
                            vozac.pet = reader.GetString(5);
                            vozac.sub = reader.GetString(6);
                            vozac.ned = reader.GetString(7);
                        }
                    }
                }
            }
            return vozac;
        }
    }
}
