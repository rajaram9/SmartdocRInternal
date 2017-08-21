using SmartIndexDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartIndexServicesInterface
{
   public interface IExtractionService
    {
       List<BatchExtraction> GetExtractionData(int BatchID);
    }
}
