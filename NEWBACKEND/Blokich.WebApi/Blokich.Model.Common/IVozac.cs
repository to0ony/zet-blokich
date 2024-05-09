using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blokich.Model.Common
{
    public interface IVozac
    {
        int vozac { get; set; }
        string pon { get; set; }
        string uto { get; set; }
        string sri { get; set; }
        string cet { get; set; }
        string pet { get; set; }
        string sub { get; set; }
        string ned { get; set; }
    }
}
