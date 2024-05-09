using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Blokich.Model;

namespace Blokich.Repository.Common
{
    public interface IDisponentRepository
    {
        Task<Vozac> GetDriverById(int brojVozac);
    }
}
