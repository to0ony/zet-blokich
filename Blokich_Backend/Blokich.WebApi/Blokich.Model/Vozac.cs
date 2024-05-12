using Blokich.Model.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blokich.Model
{
    public class Vozac : IVozac  
    {
        public int vozac { get; set; }
        public string pon { get; set; }
        public string uto { get; set; }
        public string sri { get; set; }
        public string cet { get; set; }
        public string pet { get; set; }
        public string sub { get; set; }
        public string ned { get; set; }
    }
}
