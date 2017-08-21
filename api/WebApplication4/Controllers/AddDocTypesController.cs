using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Configuration;
using WebApplication4;
using System.Data.Entity;
using SmartIndexDataModel;
using System.Threading.Tasks;
using Ghostscript.NET.Rasterizer;
using System.Drawing.Imaging;

namespace WebApplication4.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AddDocTypesController : ApiController
    {
        private SMARTINDEXEntities DBContext;
        static string ExtractionSamplefile = ConfigurationManager.AppSettings["ExtractionSamplefile"].ToString();
        static string ExtractionSampleImages = ConfigurationManager.AppSettings["ExtractionSampleImages"].ToString();
        public AddDocTypesController()
        {
            DBContext = new SMARTINDEXEntities();
        }
        [Route("api/Getfiles")]
        public HttpResponseMessage Get(string name, string foldername)
        {
            string sourceDir;
            string folderpath;
            List<Batch> getBatches = new List<Batch>();
            if (name == "name")
            {
                sourceDir = ConfigurationManager.AppSettings["UploadedFiles"].ToString();
            }
            else
            {
                sourceDir = ConfigurationManager.AppSettings["OutputFiles"].ToString() + name.Replace(".pdf", "") + "\\" + foldername;
                var context = new SMARTINDEXEntities();
                getBatches = context.Batches.Where(i => i.Batchname == name).ToList();
            }
            List<classificationoutputfile> obj = new List<classificationoutputfile>();
            if (System.IO.Directory.Exists(sourceDir))
            {
                var dir = new DirectoryInfo(sourceDir);
                FileInfo[] files = dir.GetFiles();

                for (int i = 0; i < files.Length; i++)
                {
                    FileInfo file = files[i];
                    string RunningStatus = "";

                    if (getBatches[0].Totalnoofpages == 0)
                    {
                        RunningStatus = "Not yet Started";
                    }
                    else if (getBatches[0].Totalnoofpages == files.Length)
                    {
                        RunningStatus = "Completed";
                    }
                    else if ((getBatches[0].Totalnoofpages != files.Length) && (getBatches[0].Totalnoofpages != 0))
                    {
                        RunningStatus = "Processing";
                    }

                    obj.Add(new classificationoutputfile()
                    {
                        filename = file.Name,
                        filepath = file.Name,
                        createddate = file.CreationTime,
                        lateststatus = RunningStatus,
                        totalpages = getBatches[0].Totalnoofpages,
                        processingpages = files.Length
                    });
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, obj);
        }
        [Route("api/GetImages")]
        public HttpResponseMessage GetImages(string name, string foldername)
        {
            string sourceDir;
            string folderpath;
            List<Batch> getBatches = new List<Batch>();
            if (name == "name")
            {
                sourceDir = ConfigurationManager.AppSettings["UploadedFiles"].ToString();
            }
            else
            {
                sourceDir = ConfigurationManager.AppSettings["OutputFiles"].ToString() + name.Replace(".pdf", "") + "\\" + foldername;
                var context = new SMARTINDEXEntities();
                getBatches = context.Batches.Where(i => i.Batchname == name).ToList();
            }
            List<classificationoutputfile> obj = new List<classificationoutputfile>();
            if (System.IO.Directory.Exists(sourceDir))
            {
                var dir = new DirectoryInfo(sourceDir);
                FileInfo[] files = dir.GetFiles();

                obj.Add(new classificationoutputfile()
                {
                    totalpages = getBatches[0].Totalnoofpages,
                    processingpages = files.Length
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK, obj);
        }
        [HttpPost(), Route("api/upload")]
        public HttpResponseMessage UploadFiles()
        {
            int iUploadedCnt = 0;

            // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.

            string UploadedFiles = ConfigurationManager.AppSettings["UploadedFiles"].ToString();
            string OcrProcessFiles = ConfigurationManager.AppSettings["OcrProcessFiles"].ToString();
            string OutputFiles = ConfigurationManager.AppSettings["OutputFiles"].ToString();

            if (!System.IO.Directory.Exists(UploadedFiles))
            {
                CreateDirectoryRecursively(UploadedFiles);
            }

            if (!System.IO.Directory.Exists(OcrProcessFiles))
            {
                CreateDirectoryRecursively(OcrProcessFiles);
            }

            if (!System.IO.Directory.Exists(OutputFiles))
            {
                CreateDirectoryRecursively(OutputFiles);
            }

            System.Web.HttpFileCollection hfc = HttpContext.Current.Request.Files;

            var context = new SMARTINDEXEntities();
            List<Batch> newBatches = new List<Batch>();
            List<BatchAudit> newBatchAudits = new List<BatchAudit>();

            // CHECK THE FILE COUNT.
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];
                if (hpf.ContentLength > 0)
                {
                    // SAVE THE FILES IN THE FOLDER.
                    string dattime = DateTime.Now.ToString("yyyyMMddhhmmss");
                    string Sourcepath = UploadedFiles + Path.GetFileNameWithoutExtension(hpf.FileName) + dattime;
                    string NewFolderpath = OutputFiles + Path.GetFileNameWithoutExtension(hpf.FileName) + dattime;
                    hpf.SaveAs(Sourcepath + Path.GetExtension(hpf.FileName));
                    System.IO.File.Copy(Sourcepath + Path.GetExtension(hpf.FileName), OcrProcessFiles + Path.GetFileNameWithoutExtension(hpf.FileName) + dattime + Path.GetExtension(hpf.FileName), true);

                    bool exists = System.IO.Directory.Exists(NewFolderpath);

                    if (!exists)
                    {
                        System.IO.Directory.CreateDirectory(NewFolderpath);
                        System.IO.Directory.CreateDirectory(NewFolderpath + "//Classified");
                        System.IO.Directory.CreateDirectory(NewFolderpath + "//UnClassified");
                        System.IO.Directory.CreateDirectory(NewFolderpath + "//Images");
                        System.IO.Directory.CreateDirectory(NewFolderpath + "//Pdfs");
                    }
                    iUploadedCnt = iUploadedCnt + 1;

                    var NewBatch = new Batch
                    {
                        Batchname = Path.GetFileNameWithoutExtension(hpf.FileName) + dattime,
                        Createdby = 1,
                        Createddate = DateTime.Now,
                        Ocrengine = "OCRengine1",
                        Statusid = 2,
                        QueueStatusid = 8,
                        BatchPath = UploadedFiles + Path.GetFileNameWithoutExtension(hpf.FileName) + dattime + Path.GetExtension(hpf.FileName)
                    };
                    newBatches.Add(NewBatch);

                    var NewBatchAudit = new BatchAudit
                    {
                        Batchname = Path.GetFileNameWithoutExtension(hpf.FileName) + dattime,
                        Createdby = 1,
                        Createddate = DateTime.Now,
                        QueueStatusid = 8,
                        Statusid = 2,
                        Startdate = DateTime.Now
                    };
                    newBatchAudits.Add(NewBatchAudit);
                }
            }
            context.Batches.AddRange(newBatches);
            context.SaveChanges();
            if (iUploadedCnt > 0)
            {
                return Request.CreateResponse(HttpStatusCode.OK, newBatches);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
        public bool CreateDirectoryRecursively(string path)
        {
            try
            {
                string[] pathParts = path.Split('\\');
                for (var i = 0; i < pathParts.Length; i++)
                {
                    // Correct part for drive letters
                    if (i == 0 && pathParts[i].Contains(":"))
                    {
                        pathParts[i] = pathParts[i] + "\\";
                    } // Do not try to create last part if it has a period (is probably the file name)
                    else if (i == pathParts.Length - 1 && pathParts[i].Contains("."))
                    {
                        return true;
                    }
                    if (i > 0)
                    {
                        pathParts[i] = Path.Combine(pathParts[i - 1], pathParts[i]);
                    }
                    if (!Directory.Exists(pathParts[i]))
                    {
                        Directory.CreateDirectory(pathParts[i]);
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
        [HttpGet(), Route("api/getBatches")]
        public HttpResponseMessage getBatches()
        {
            var batches = (from q in DBContext.Batches.Where(s => s.Batchname != null)
                           select q).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, batches);

        }
        [HttpGet(), Route("api/batchImages")]
        public HttpResponseMessage GetBatchImages(string BatchName)
        {
            List<string> filesName = new List<string>();
            var sourceDir = ConfigurationManager.AppSettings["OutputFiles"].ToString() + BatchName + "\\Images";
            if (System.IO.Directory.Exists(sourceDir))
            {
                var dir = new DirectoryInfo(sourceDir);
                FileInfo[] files = dir.GetFiles();

                filesName = (from q in files
                             select q.Name).ToList();
            }
            return Request.CreateResponse(HttpStatusCode.OK, filesName);
        }
        [Route("api/GetClassificationConfig")]
        public HttpResponseMessage GetClassificationConfig()
        {
            var context = new SMARTINDEXEntities();
            var active = true;
            var DocTypes = (from post in context.Cst_DocTypes
                            join meta in context.Cst_Keywords on post.Cst_DocTypeID equals meta.Cst_DocTypeID
                            join docname in context.Cst_DocName on post.Cst_DocNameID equals docname.Cst_DocNameID
                            where (post.IsActive == active && meta.IsActive == 1)
                            select new {docname.Cst_DocNameID,post.Cst_DocTypeID,meta.Cst_KeywordID, docname.DocName, post.DocTypeName, post.MinPages, post.MaxPages, post.Percentageofsimilarity, post.Priority, post.HavingPageNumbers, post.PageNumberFormat, meta.Keyword, meta.PagePosition, meta.Thresholdpercetage, meta.ZoneArea, meta.HasLastKeywords, meta.Casesensitive, post.FileName }).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, DocTypes);
        }

        [Route("api/GetDocumentTypes")]
        public HttpResponseMessage GetDocumentTypes()
        {
            var context = new SMARTINDEXEntities();
            var active = true;
            var DocTypes = (from post in context.Cst_DocTypes
                            where (post.IsActive == active)
                            select new { post.DocTypeName, post.Cst_DocTypeID }).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, DocTypes);
        }

        [HttpPost]
        [Route("api/SaveClientDocumentsMappings")]
        public HttpResponseMessage SaveClientDocumentsMappings(ClientDocumentsMappings SaveRequest)
        {
            var context = new SMARTINDEXEntities();
            var ClientMappingDocTypes1 = (from c in context.ClientMappingDocTypes
                                          where c.Clientid == SaveRequest.ClientID
                                          select c).FirstOrDefault();
            if (ClientMappingDocTypes1 != null)
            {
                ClientMappingDocTypes1.Isactive = false;
                ClientMappingDocTypes1.Modifiedby = 1;
                ClientMappingDocTypes1.Modifieddate = DateTime.Now;
                context.SaveChanges();
            }

            ClientMappingDocType cst = new ClientMappingDocType
            {
                Clientid = SaveRequest.ClientID,
                DocumentIDs = SaveRequest.DocumentIDs,
                Isactive = true,
                Createdby = 1,
                Createddate = DateTime.Now
            };

            context.ClientMappingDocTypes.Add(cst);
            context.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Saved successfully");
        }

        [Route("api/GetClientDocumentsMappings")]
        public HttpResponseMessage GetClientDocumentsMappings()
        {
            var context = new SMARTINDEXEntities();
            var active = true;
            var ClientMappingDocTypes1 = (from post in context.ClientMappingDocTypes
                                          where (post.Isactive == active)
                                          select new { post.DocumentIDs, post.Clientid }).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, ClientMappingDocTypes1);
        }

        [Route("api/SaveExtractionChanges")]
        public HttpResponseMessage SaveExtractionChanges(saveExtractiondata data)
        {
            var context = new SMARTINDEXEntities();

            var Batchdata = (from post in context.BatchExtractions
                             where (post.Batchid == data.batchid && post.Batchpath == data.Batchpath)
                             select post).FirstOrDefault();
            if (Batchdata != null)
            {
                Batchdata.JsonString = data.JsonString;
                context.SaveChanges();
            }
            // List<saveExtractiondata> UpdatedPages = new List<saveExtractiondata>();
            // var active = true;
            //  UpdatedPages = (from post in data.batchid select post).ToList();
            //  for (int i = 0; i < BatchExtractions.Count; i++)
            // {
            //     if (BatchExtractions != null)
            //     {
            //          var Batchdata = (from post in context.BatchExtractions
            //                               where (post.Isactive == active && post.Batchid==BatchExtractions[i].batchid && post.Batchpath==BatchExtractions[i].Batchpath)
            //                               select  post ).FirstOrDefault();;
            //         Batchdata.JsonString=BatchExtractions[i].JsonString;
            //         context.SaveChanges();
            //     }
            //}
            return Request.CreateResponse(HttpStatusCode.OK, "Saved successfully");
        }

        [Route("api/SaveNewDocumentName")]
        public HttpResponseMessage SaveNewDocumentName(SaveNewDocument data)
        {
            var context = new SMARTINDEXEntities();
            List<Cst_DocName> newCst_DocName = new List<Cst_DocName>();
            var NewDocName = new Cst_DocName
            {
                DocName = data.DocName,
                Createdby = data.Createdby

            };
            newCst_DocName.Add(NewDocName);
            context.Cst_DocName.AddRange(newCst_DocName);
            context.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Saved successfully");
        }
        //[EnableCors("AllowAll")]
        [HttpPost]
        [Route("api/SaveExtractionConfig")]
        public HttpResponseMessage SaveExtractionConfig(List<PrimeCar> data)
        {
            var context = new SMARTINDEXEntities();
            List<ExtractionConfig> newCst_DocName = new List<ExtractionConfig>();
            foreach(var d in data)
            {
                //var GetdocName = (DBContext.Cst_DocName.Where(i => i.DocName == d.docName)).ToList();
                //var GetdocTypeName = (DBContext.Cst_DocTypes.Where(i => i.DocTypeName == d.docTypeName && i.Cst_DocNameID == GetdocName[0].Cst_DocNameID)).ToList();
               // if (GetdocTypeName.Count > 0) { 
                 var ExtractionConfig = new ExtractionConfig
                 {
                   ExtractionType = d.extractionType,
                   Pageindex=d.pageindex,
                   FieldName=d.fieldname,
                   FieldDataCordinates=d.fielddata,
                   Anchor=d.Anchor,
                   AnchorDataCordinates=d.AnchorCoordinates,
                   Brules=d.bRules,
                   isactive=true,
                   createdby=1,
                   createddate=DateTime.Now,
                   Cst_DocTypeID =d.docTypeID
                 };
                 newCst_DocName.Add(ExtractionConfig);

                //}
            }
            context.ExtractionConfigs.AddRange(newCst_DocName);
            context.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Saved successfully");
        }

        [HttpPost(), Route("api/uploadSampleFile")]
        public HttpResponseMessage UploadSampleFiles()
        {
            int iUploadedCnt = 0;

            // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.

            System.Web.HttpFileCollection hfc = HttpContext.Current.Request.Files;

            string DocName = HttpContext.Current.Request.Form["DocName"];
            string docTypeName = HttpContext.Current.Request.Form["docTypeName"];

            string UploadedFiles = ConfigurationManager.AppSettings["SampleFiles"].ToString() + DocName + "//" + docTypeName + "//";


            if (!System.IO.Directory.Exists(UploadedFiles))
            {
                CreateDirectoryRecursively(UploadedFiles);
            }

            var context = new SMARTINDEXEntities();
            List<Batch> newBatches = new List<Batch>();
            List<BatchAudit> newBatchAudits = new List<BatchAudit>();

            string dattime = DateTime.Now.ToString("yyyyMMddhhmmss");
            // CHECK THE FILE COUNT.
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];
                if (hpf.ContentLength > 0)
                {
                    // SAVE THE FILES IN THE FOLDER.

                    string Sourcepath = UploadedFiles + Path.GetFileNameWithoutExtension(hpf.FileName) + dattime;
                    hpf.SaveAs(Sourcepath + Path.GetExtension(hpf.FileName));
                    iUploadedCnt = iUploadedCnt + 1;
                    PdfToPng(Sourcepath + Path.GetExtension(hpf.FileName), Path.GetFileNameWithoutExtension(hpf.FileName), DocName + "\\" + docTypeName);
                }
            }
            if (iUploadedCnt > 0)
            {
                System.Web.HttpPostedFile hpf = hfc[0];
                return Request.CreateResponse(HttpStatusCode.OK, Path.GetFileNameWithoutExtension(hpf.FileName) + dattime + Path.GetExtension(hpf.FileName));
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
        private  void PdfToPng(string inputFile, string outputFileName,string doctypename)
        {
            var xDpi = 100; //set the x DPI
            var yDpi = 100; //set the y DPI
            var pageNumber = 1; // the pages in a PDF document

           string ExtractionSampleImages1 = ExtractionSampleImages + doctypename;

           if (!System.IO.Directory.Exists(ExtractionSampleImages1))
            {
                CreateDirectoryRecursively(ExtractionSampleImages1);
            }

            using (var rasterizer = new GhostscriptRasterizer()) //create an instance for GhostscriptRasterizer
            {
                rasterizer.Open(inputFile); //opens the PDF file for rasterizing


                int pagecount= rasterizer.PageCount;

                for (int i = 1; i < pagecount + 1; i++) {
                    pageNumber = i;
                //set the output image(png's) complete path
                    var outputPNGPath = Path.Combine(ExtractionSampleImages1, string.Format("{0}.jpeg", outputFileName + "_" + pageNumber));

                //converts the PDF pages to png's 
                var pdf2PNG = rasterizer.GetPage(xDpi, yDpi, pageNumber);

                //save the png's
                pdf2PNG.Save(outputPNGPath, ImageFormat.Jpeg);
               }

                //Console.WriteLine("Saved " + outputPNGPath);

            }
        }
        [HttpGet(), Route("api/GetSampleImages")]
        public HttpResponseMessage GetSampleImages(string docName, string docTypeName)
        {
            List<string> filesName = new List<string>();
            var sourceDir = ConfigurationManager.AppSettings["ExtractionSampleImages"].ToString() + docName + "\\" + docTypeName;
            if (System.IO.Directory.Exists(sourceDir))
            {
                var dir = new DirectoryInfo(sourceDir);
                FileInfo[] files = dir.GetFiles();

                filesName = (from q in files
                             select (docName + "\\" + docTypeName + "\\" + q.Name)).ToList();
            }
            return Request.CreateResponse(HttpStatusCode.OK, filesName);
        }
        [Route("api/SaveData")]
        public HttpResponseMessage SaveClassifyData(List<SaveClassifyConfig> data)
        {
            var context = new SMARTINDEXEntities();
            string addedind = "added";
            string modifiedind = "Modified";
            string docNamechangeitem = "docName";
            string docTypeNamechangeitem = "docTypeName";
            string Keywordchangeitem = "keyword";
           //New doc Name
           var NewdocName = data.FindAll(e => (e.Ind == addedind && e.Changeitem == docNamechangeitem)).ToList();
            if (NewdocName.Count > 0) { 
            List<Cst_DocName> new_DocName = new List<Cst_DocName>();
            foreach (var d in NewdocName)
            {
                var cst_docName = new Cst_DocName
                {
                    DocName = d.docName,
                    isactive = true
                };
                new_DocName.Add(cst_docName);
            }
            context.Cst_DocName.AddRange(new_DocName);
            context.SaveChanges();
            }

            //New docType

            var NewdocTypeName = (from d in data where (d.Ind == addedind && d.Changeitem == docTypeNamechangeitem) select new { d.docName, d.docTypeName, d.havingPageNumbers, d.Ind, d.minPages, d.maxPages, d.pageNumberFormat, d.priority, d.addIfPrevTypeisSame,d.fileName }).ToList();

            if (NewdocTypeName.Count > 0)
            {
               var NewdocTypeNameList= (from para in NewdocTypeName
                                        join d1 in DBContext.Cst_DocName
                            on para.docName equals d1.DocName
                                        select new { d1.Cst_DocNameID, para.docTypeName, para.havingPageNumbers, para.Ind, para.minPages, para.maxPages, para.pageNumberFormat, para.priority, para.addIfPrevTypeisSame, para.fileName }).ToList();

                List<Cst_DocTypes> new_DocTypeName = new List<Cst_DocTypes>();
                foreach (var d in NewdocTypeNameList)
                {
                    var cst_DocTypes = new Cst_DocTypes
                    {
                        DocTypeName=d.docTypeName ,
                        Cst_DocNameID= d.Cst_DocNameID,
                        MinPages=d.minPages,
                        MaxPages=d.maxPages,
                        HavingPageNumbers=d.havingPageNumbers,
                        PageNumberFormat=d.pageNumberFormat,
                        AddIfPrevTypeisSame=d.addIfPrevTypeisSame,                
                        Priority=d.priority,
                        FileName=d.fileName
                    };
                    new_DocTypeName.Add(cst_DocTypes);
                }
                context.Cst_DocTypes.AddRange(new_DocTypeName);
                context.SaveChanges();
            }

          //New Keyword

           var NewKeyword = (from d in data where (d.Ind == addedind && d.Changeitem == Keywordchangeitem) select new {d.docName,d.docTypeName, d.keyword, d.percentageofsimilarity, d.keywordThresholdpercetage, d.zoneArea, d.casesensitive, d.pagePosition }).ToList();

          if (NewKeyword.Count > 0)
          {
            var NewKeywordList = (from para in NewKeyword
                                      join d1 in DBContext.Cst_DocName
                                      on para.docName equals d1.DocName
                                      join d2 in DBContext.Cst_DocTypes
                                     on (d1.Cst_DocNameID.ToString()+'_'+para.docTypeName) equals (d2.Cst_DocNameID.ToString() + '_'+d2.DocTypeName)
                                      select new { d1.Cst_DocNameID, d2.Cst_DocTypeID, para.docTypeName, para.keyword, para.percentageofsimilarity, para.keywordThresholdpercetage, para.zoneArea, para.casesensitive, para.pagePosition}).ToList();

              List<Cst_Keywords> new_Keywords = new List<Cst_Keywords>();
              foreach (var d in NewKeywordList)
              {
                var cst_Keywords = new Cst_Keywords
                {
                  Keyword = d.keyword,
                  Cst_DocTypeID = d.Cst_DocTypeID,
                  Thresholdpercetage = Convert.ToDecimal(d.keywordThresholdpercetage),
                  ZoneArea = d.zoneArea,
                  Casesensitive = d.casesensitive=="1"?true:false,
                  PagePosition = d.pagePosition,
                  IsActive=1
                  //percentageofsimilarity = d.percentageofsimilarity
                };
                new_Keywords.Add(cst_Keywords);
              }
              context.Cst_Keywords.AddRange(new_Keywords);
              context.SaveChanges();
          }

          //Modified docType

          var ModdocTypeName = (from d in data where (d.Ind == modifiedind && d.Changeitem == docTypeNamechangeitem) select new { d.Changeitem,d.Ind,d.changeproperty,d.docName,d.docTypeName,d.newvalue,d.oldValue }).ToList();

          if (ModdocTypeName.Count > 0)
            {
                var ModdocTypeNameList = (from para in ModdocTypeName
                                          join d1 in DBContext.Cst_DocName
                              on para.docName equals d1.DocName
                                          select new { d1.Cst_DocNameID, para.Changeitem, para.Ind, para.changeproperty, para.docName, para.docTypeName, para.newvalue, para.oldValue }).ToList();

                var ModdocTypeNameList1 = (from para in ModdocTypeNameList
                                          join d1 in DBContext.Cst_DocTypes
                              on para.docTypeName + "_" + para.Cst_DocNameID.ToString() equals d1.DocTypeName + "_" + d1.Cst_DocNameID.ToString()
                                          select new { d1.Cst_DocNameID,d1.Cst_DocTypeID, para.Changeitem, para.Ind, para.changeproperty, para.docName, para.docTypeName, para.newvalue, para.oldValue }).ToList();
                Cst_DocTypes stud;
                foreach (var val in ModdocTypeNameList1)
                {
                    stud = DBContext.Cst_DocTypes.Where(s => s.Cst_DocTypeID == val.Cst_DocTypeID).FirstOrDefault<Cst_DocTypes>();
                    if (val.changeproperty == "docTypeName")
                    {
                        stud.DocTypeName = val.newvalue;
                    }
                    if (val.changeproperty == "fileName")
                    {
                        stud.FileName = val.newvalue;
                    }
                    if (val.changeproperty == "maxPages")
                    {
                        stud.MaxPages = Convert.ToInt32(val.newvalue);
                    }
                    if (val.changeproperty == "minPages")
                    {
                        stud.MinPages =  Convert.ToInt32(val.newvalue);
                    }
                    if (val.changeproperty == "havingPageNumbers")
                    {
                        stud.HavingPageNumbers = val.newvalue;
                    }
                    if (val.changeproperty == "addIfPrevTypeisSame")
                    {
                        stud.AddIfPrevTypeisSame = val.newvalue;
                    }
                    if (val.changeproperty == "pageNumberFormat")
                    {
                        stud.PageNumberFormat = val.newvalue;
                    } if (val.changeproperty == "priority")
                    {
                        stud.Priority =  Convert.ToInt32(val.newvalue);
                    }
                    DBContext.SaveChanges();
               }
            }
          return Request.CreateResponse(HttpStatusCode.OK, "Saved successfully");
        }
        [HttpGet(), Route("api/GetExtractConfigbyID")]
        public HttpResponseMessage GetExtractConfigbyID(int docTypeID)
        {
          var context = new SMARTINDEXEntities();
          //var GetdocName = (DBContext.Cst_DocName.Where(i => i.DocName == docName)).ToList();
          //var GetdocTypeName = (DBContext.Cst_DocTypes.Where(i => i.DocTypeName == docTypeName && i.Cst_DocNameID == GetdocName[0].Cst_DocNameID)).ToList();
         
          var ExtractionConfigs = (from q in DBContext.ExtractionConfigs.Where(s => s.Cst_DocTypeID == docTypeID)
                     select q).ToList();

          return Request.CreateResponse(HttpStatusCode.OK, ExtractionConfigs);
        }

  }
    public class Configdate
    {
        public string DocTypeName { get; set; }
        public string MinPages { get; set; }
        public string MaxPages { get; set; }
        public string HavingPageNumbers { get; set; }
        public string PageNumberFormat { get; set; }
        public string AddIfPrevTypeisSame { get; set; }
        public string Priority { get; set; }
        public string Keyword { get; set; }
        public string PagePosition { get; set; }
        public string KeywordThresholdpercetage { get; set; }
        public string ZoneArea { get; set; }
        public string Casesensitive { get; set; }
    }
    public class classificationoutputfile
    {
        public string filename { get; set; }
        public string filepath { get; set; }
        public DateTime createddate { get; set; }
        public string lateststatus { get; set; }
        public int? totalpages { get; set; }
        public int? processingpages { get; set; }
    }
    public class ClientDocumentsMappings
    {
        public int? ClientID { get; set; }

        public string DocumentIDs { get; set; }
    }
    public class saveExtractiondata
    {
        public int? batchid { get; set; }

        public string Batchpath { get; set; }

        public string JsonString { get; set; }
    }
    public class SaveNewDocument
    {
        public string DocName { get; set; }

        public int Createdby { get; set; }
    }

    public class PrimeCar
    {
        public int index { get; set; }
        public string extractionType { get; set; }
        public int pageindex { get; set; }
        public string fieldname { get; set; }
        public string fielddata { get; set; }
        public string Anchor { get; set; }
        public string AnchorCoordinates { get; set; }
        public string bRules { get; set; }
        public string docName { get; set; }
        public string docTypeName { get; set; }
        public int docNameID { get; set; }
        public int docTypeID { get; set; }
    }

    [AttributeUsage(AttributeTargets.Property,
                Inherited = false,
                AllowMultiple = false)]
    internal sealed class OptionalAttribute : Attribute
    {
    }

    public class SaveClassifyConfig
    {
        public string Changeitem { get; set; }
        public string Ind { get; set; }
        public string docName { get; set; }
        public string docTypeName { get; set; }
        public string havingPageNumbers { get; set; }
        public string keywords { get; set; }
        public int maxPages { get; set; }
        public int minPages { get; set; }
        public string pageNumberFormat { get; set; }
        public string addIfPrevTypeisSame { get; set; }
        public int priority { get; set; }
        public string keyword { get; set; }
        public string percentageofsimilarity { get; set; }
        public string keywordThresholdpercetage { get; set; }
        public string zoneArea { get; set; }
        public string pagePosition { get; set; }
        public string casesensitive { get; set; }
        public string changeproperty { get; set; }
        public string newvalue { get; set; }
        public string oldValue { get; set; }
        public string fileName { get; set; }
  }
}
