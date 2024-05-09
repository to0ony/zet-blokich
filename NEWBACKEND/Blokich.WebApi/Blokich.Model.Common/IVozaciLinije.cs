using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blokich.Model.Common
{
    public interface IVozaciLinije
    {
        int BrojVozaca { get; set; }
        string ImePrezime { get; set; }
        string BrojSluzbe { get; set; }
        string Linija { get; set; }
        int VR { get; set; }
        string NastupSluzbe { get; set; }
        string Od { get; set; }
        string Do { get; set; }
        string ZavrsetakSluzbe { get; set; }
    }
}
