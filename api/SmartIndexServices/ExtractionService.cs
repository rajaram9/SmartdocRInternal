using SmartIndexDataModel;
using SmartIndexServicesInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartIndexServices
{
    public class ExtractionService : IExtractionService
    {
        private SMARTINDEXEntities DBContext;
        public ExtractionService()
        {
            DBContext = new SMARTINDEXEntities();
        }
        public List<BatchExtraction> GetExtractionData(int BatchID)
        {
            var ExtractionData = DBContext.BatchExtractions
                .Where(q => q.Batchid == BatchID)
                .Select(q => q)
                .ToList();
            return ExtractionData;
        }
    }
}
