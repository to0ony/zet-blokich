
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
    public class DisponentController : ApiController
    {
        [HttpGet]
        public async Task<HttpResponseMessage> GetDriverById(int brojVozac)
        {
            try
            {
                var response = await new DisponentRepository().GetDriverById(brojVozac);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
    }
}
