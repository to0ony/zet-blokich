using Blokich.Model.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blokich.Model
{
    public class RasporedVoznje : IRasporedVoznje
    {
        public int BrojVozaca { get; set; }
        public IEnumerable<ISluzba> pon { get; set; }
        public IEnumerable<ISluzba> uto { get; set; }
        public IEnumerable<ISluzba> sri { get; set; }
        public IEnumerable<ISluzba> cet { get; set; }
        public IEnumerable<ISluzba> sub { get; set; }
        public IEnumerable<ISluzba> pet { get; set; }
        public IEnumerable<ISluzba> ned { get; set; }
        public int tjedan_u_godini { get; set; }
        public int godina { get; set; }
    }
}
