using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SmartIndexBE;
using SmartIndexServicesInterface;
using System.Web.Http.Cors;


namespace WebApplication4.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ClassificationController : ApiController
    {
        private IClassificationService iClassificationService;

        public ClassificationController(IClassificationService _iClassificationService)
        {
            iClassificationService = _iClassificationService;
        }
       
        [HttpPost]
        [Route("api/SaveManualClassification")]
        public HttpResponseMessage SaveManualClassification(ManualClassificationSaveRequest SaveRequest)
        {
            iClassificationService.SaveManualClassification(SaveRequest);
            return Request.CreateResponse(HttpStatusCode.OK, "Saved successfully");
        }

        [HttpPost]
        [Route("api/CreatePdfFromImages")]
        public HttpResponseMessage CreatePdfFromImages(ClassificationPdfRequest PdfRequest)
        {
            string PdfPath= iClassificationService.CreatePdfFromImages(PdfRequest);
            return Request.CreateResponse(HttpStatusCode.OK, PdfPath);
        }

        [HttpGet]
        [Route("api/createImageFromPdf")]
        public HttpResponseMessage CreateImageFromPdf(string BatchName)
        {
            iClassificationService.CreateImageFromPdf(BatchName);
            return Request.CreateResponse(HttpStatusCode.OK, "ok");
        }
        [HttpPost]
        [Route("api/movePages")]
        public HttpResponseMessage CreateImageFromPdf(List<ClassificationMoveRequest> MoveRequest)
        {
            iClassificationService.MovePageToNewBatch(MoveRequest);
            return Request.CreateResponse(HttpStatusCode.OK, "ok");
        }
        
    }

   
   
}
