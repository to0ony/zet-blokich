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
    public class RasporedVoznjeController : ApiController
    {
        [HttpGet]
        public async Task<HttpResponseMessage> GetRaspored(int brojVozaca)
        {
            try
            {
                var response = await new RasporedVoznjeRepository().GetRasporedVoznjeForCurrentWeek(brojVozaca);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
    }
}
