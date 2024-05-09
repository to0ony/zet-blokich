using Blokich.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blokich.Repository.Common
{
    public interface IVozaciLinijeRepository
    {
        Task<IEnumerable<VozaciLinije>> GetVozaceLinije(int brojLinije, string danVoznje);
    }
}
