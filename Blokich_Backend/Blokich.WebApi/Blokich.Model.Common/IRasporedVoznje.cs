using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blokich.Model.Common
{
    public interface IRasporedVoznje
    {
        int BrojVozaca { get; set; }
        IEnumerable<ISluzba> pon { get; set; }
        IEnumerable<ISluzba> uto { get; set; }
        IEnumerable<ISluzba> sri { get; set; }
        IEnumerable<ISluzba> cet { get; set; }
        IEnumerable<ISluzba> sub { get; set; }
        IEnumerable<ISluzba> pet { get; set; }
        IEnumerable<ISluzba> ned { get; set; }
        int tjedan_u_godini { get; set; }
        int godina { get; set; }
    }
}
