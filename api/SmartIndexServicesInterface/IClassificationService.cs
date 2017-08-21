using SmartIndexBE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartIndexServicesInterface
{
  public  interface IClassificationService
    {
      void SaveManualClassification(ManualClassificationSaveRequest SaveRequest);
      string CreatePdfFromImages(ClassificationPdfRequest PdfRequest);
      void CreateImageFromPdf(string BatchName);
      void MovePageToNewBatch(List<ClassificationMoveRequest> MoveRequest);
    }
}
