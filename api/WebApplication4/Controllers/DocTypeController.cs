using SmartIndexServicesInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApplication4.Controllers
{
     [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DocTypeController : ApiController
    {
        private IDocTypesService iDocTypesService;

        public DocTypeController(IDocTypesService _iDocTypesService)
        {
            iDocTypesService = _iDocTypesService;
        }

        [Route("api/docTypes")]
        public HttpResponseMessage Get()
        {
           var DocTypes= iDocTypesService.GetDocTypes();
           return Request.CreateResponse(HttpStatusCode.OK, DocTypes);
        }
    }
}