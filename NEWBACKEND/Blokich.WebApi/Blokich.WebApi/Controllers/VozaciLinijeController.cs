using Blokich.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Blokich.Controllers
{
    public class VozaciLinijeController : ApiController
    {
        [HttpGet]
        public async Task<HttpResponseMessage> GetVozaceLinije(int brojLinije, string danVoznje)
        {
            try
            {
                var response = await new VozaciLinijeRepository().GetVozaceLinije(brojLinije, danVoznje);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
    }
}
