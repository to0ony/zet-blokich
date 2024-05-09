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
    public class SluzbaRepository : ISluzbaRepository
    {
        private readonly string connString = "Server = 127.0.0.1;Port=5432;Database=Blokich ;User Id = postgres; Password=postgres;";

        public async Task<IEnumerable<Sluzba>> GetSluzba(int brojSluzbe)
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
                        while (reader.Read())
                        {
                            Sluzba sluzba = new Sluzba()
                            {
                                BrojSluzbe = reader.GetString(0),
                                Linija = reader.GetString(1),
                                VR = reader.GetInt32(2),
                                NastupSluzbe = reader.GetString(3),
                                Od = reader.GetString(4),
                                Do = reader.GetString(5),
                                ZavrsetakSluzbe = reader.GetString(6)
                            };
                            sluzbe.Add(sluzba);
                        }
                    }
                }
            }
            return sluzbe;
        }

    }
}
