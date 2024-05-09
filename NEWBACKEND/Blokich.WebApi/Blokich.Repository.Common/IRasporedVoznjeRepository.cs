using Blokich.Model;
using Blokich.Model.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blokich.Repository.Common
{
    public interface IRasporedVoznjeRepository
    {
        Task<RasporedVoznje> GetRasporedVoznje(int brojVozaca);
    }
}
