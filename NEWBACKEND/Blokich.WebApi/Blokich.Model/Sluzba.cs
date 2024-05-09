using Blokich.Model.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blokich.Model
{
    public class Sluzba : ISluzba
    {
        public bool IsDriving { get; set; }
        public string BrojSluzbe { get; set; }
        public string Linija { get; set; }
        public int? VR { get; set; }
        public string NastupSluzbe { get; set; }
        public string Od { get; set; }
        public string Do { get; set; }
        public string ZavrsetakSluzbe { get; set; }
    }
}
