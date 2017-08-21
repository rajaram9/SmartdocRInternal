using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SmartIndexServicesInterface;
using System.Web.Http.Cors;

namespace WebApplication4.Controllers
{
    [RoutePrefix("api")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ExtractionController : ApiController
    {
        private IExtractionService iExtractionService;

        public ExtractionController(IExtractionService _iExtractionService)
        {
            iExtractionService = _iExtractionService;
        }

        [HttpGet]
        [Route("getExtractData")]
        public HttpResponseMessage Get(int BatchID)
        {
            var ExtractedData= iExtractionService.GetExtractionData(BatchID);
            return Request.CreateResponse(HttpStatusCode.OK, ExtractedData);
        }
    }
}
