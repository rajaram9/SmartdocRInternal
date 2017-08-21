using SmartIndexDataModel;
using SmartIndexServicesInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartIndexServices
{
    public class DocTypesService : IDocTypesService
    {
        private SMARTINDEXEntities DBContext;
        public DocTypesService()
        {
            DBContext = new SMARTINDEXEntities();
        }
        public List<string> GetDocTypes()
        {
            List<string> DocTypes = DBContext.Cst_DocTypes
                .Where(q=>q.IsActive==true)
                .Select(q => q.DocTypeName)
                .ToList();
            return DocTypes;
        }
    }
}
