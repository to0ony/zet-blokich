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
    public class SluzbaController : ApiController
    {
        [HttpGet]
        public async Task<HttpResponseMessage> GetSluzba(int brojSluzbe)
        {
            try
            {
                var response = await new SluzbaRepository().GetSluzba(brojSluzbe);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
    }
}
