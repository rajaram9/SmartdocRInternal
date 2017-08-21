using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartIndexBE;
using System.Configuration;
using System.IO;
using SmartIndexServicesInterface;
using iTextSharp.text;
using Ghostscript.NET;
using Ghostscript.NET.Rasterizer;
using System.Reflection;
using System.Drawing;
using System.Drawing.Imaging;
using System.Text.RegularExpressions;
namespace SmartIndexServices
{
    public class ClassificationService : IClassificationService
    {
        List<pages> UpdatedPages = new List<pages>();
        string OutputFolder = "";
        string ImagesFolderPath = "";

        public void SaveManualClassification(ManualClassificationSaveRequest SaveRequest)
        {

            this.OutputFolder = ConfigurationManager.AppSettings["OutputFiles"].ToString();
            this.ImagesFolderPath = Path.Combine(OutputFolder, SaveRequest.BatchName, "Images");


            this.UpdatedPages = (from q in SaveRequest.pages
                                 where q.OriginalName != q.UpdatedName
                                 select q).ToList();


            for (int i = 0; i < this.UpdatedPages.Count; i++)
            {
                if (this.UpdatedPages[i].IsUpdated == false)
                {
                    string SourceImage = Path.Combine(ImagesFolderPath, UpdatedPages[i].OriginalName);
                    string DestinationImage = Path.Combine(ImagesFolderPath, UpdatedPages[i].UpdatedName);
                    this.UpdatedPages[i].IsUpdated = true;
                    this.moveFiles(SourceImage, DestinationImage);
                }

            }
        }
        public string CreatePdfFromImages(ClassificationPdfRequest PdfRequest)
        {
            this.OutputFolder = ConfigurationManager.AppSettings["OutputFiles"].ToString();
            this.ImagesFolderPath = Path.Combine(OutputFolder, PdfRequest.BatchName, "Images");
            string DestinationPdfFolder = Path.Combine(OutputFolder, PdfRequest.BatchName, "ManualPDF");
            string RandomFileName = Path.GetRandomFileName() + ".pdf";
            string DestinationPdfFile = Path.Combine(DestinationPdfFolder, RandomFileName);

            if (!Directory.Exists(DestinationPdfFolder))
            {
                Directory.CreateDirectory(DestinationPdfFolder);
            }

            iTextSharp.text.Rectangle pageSize = new iTextSharp.text.Rectangle(0, 0, 2481, 3508);
            using (var ms = new MemoryStream())
            {
                var document = new iTextSharp.text.Document(pageSize, 0, 0, 0, 0);
                iTextSharp.text.pdf.PdfWriter.GetInstance(document, ms).SetFullCompression();
                document.Open();
                foreach (string Image in PdfRequest.Images)
                {
                    string SourceImage = Path.Combine(ImagesFolderPath, Image);
                    var ImageInstance = iTextSharp.text.Image.GetInstance(SourceImage);
                    ImageInstance.ScaleToFit(document.PageSize.Width, document.PageSize.Height);
                    document.Add(ImageInstance);
                }
                document.Close();
                File.WriteAllBytes(DestinationPdfFile, ms.ToArray());
            }
          //byte[] ms= CreatePdf(ImagesFolderPath);
            return Path.Combine(PdfRequest.BatchName, "ManualPDF", RandomFileName);
        }
        public void CreateImageFromPdf(string BatchName)
        {

            this.OutputFolder = ConfigurationManager.AppSettings["OutputFiles"].ToString();
            string PdfSourceFolder = Path.Combine(OutputFolder, BatchName, "pdfs");
            string ImageDestinationFolder = Path.Combine(OutputFolder, BatchName, "Images");


            // check if the images already there
            var ImagesDir = new DirectoryInfo(ImageDestinationFolder);
            FileInfo[] Images = ImagesDir.GetFiles();
            if (Images.Count() > 0)
            {
                return;
            }
            ManageUnclassifiedDocs(BatchName);


            GhostscriptVersionInfo _lastInstalledVersion = null;
            GhostscriptRasterizer _rasterizer = null;
            _lastInstalledVersion = GhostscriptVersionInfo.GetLastInstalledVersion(GhostscriptLicense.GPL | GhostscriptLicense.AFPL, GhostscriptLicense.GPL);
            _rasterizer = new GhostscriptRasterizer();

            int desired_x_dpi = 96;
            int desired_y_dpi = 96;

            var dir = new DirectoryInfo(PdfSourceFolder);
            FileInfo[] files = dir.GetFiles();
            foreach (var file in files)
            {
                _rasterizer.Open(file.FullName, _lastInstalledVersion, true);
                string pageFilePath = Path.Combine(ImageDestinationFolder, Path.GetFileNameWithoutExtension(file.Name) + ".png");
                System.Drawing.Image img = _rasterizer.GetPage(desired_x_dpi, desired_y_dpi, 1);
                img.Save(pageFilePath, ImageFormat.Png);
            }
        }
        private void ManageUnclassifiedDocs(string BatchName)
        {
            this.OutputFolder = ConfigurationManager.AppSettings["OutputFiles"].ToString();
            string Unclassified = Path.Combine(OutputFolder, BatchName, "UnClassified");
            string PdfSourceFolder = Path.Combine(OutputFolder, BatchName, "pdfs");

            var UnclassifiedDir = new DirectoryInfo(Unclassified);
            var PDFDir = new DirectoryInfo(PdfSourceFolder);

            FileInfo[] UnclassifiedFiles = UnclassifiedDir.GetFiles();


            if (UnclassifiedFiles.Count() > 0)
            {
                int ExistingUnclassfiedFilesCount = PDFDir.GetFiles().Where(ExistingUnclassfiedFile => new Regex("unclassfied").IsMatch(ExistingUnclassfiedFile.Name)).ToList().Count();
                foreach (var File in UnclassifiedFiles)
                {
                    var FileName = Path.GetFileNameWithoutExtension(File.Name);
                    if (!FileName.Contains("unknown") && !FileName.Contains("unclassfied"))
                    {
                        Regex reg = new Regex(FileName);
                        List<FileInfo> PDFFiles = PDFDir.GetFiles().Where(PdfFile => reg.IsMatch(PdfFile.Name)).ToList();
                        foreach (var PdfFile in PDFFiles)
                        {
                            var PdfFileName = Path.GetFileNameWithoutExtension(PdfFile.Name);
                            if (!PdfFileName.Contains("unknown") && !PdfFileName.Contains("unclassfied"))
                            {
                                ExistingUnclassfiedFilesCount++;
                                var DestinationName = Path.Combine(PdfFile.DirectoryName, "unclassfied~0~" + ExistingUnclassfiedFilesCount + PdfFile.Extension);
                                System.IO.File.Move(PdfFile.FullName, DestinationName);
                            }
                        }
                    }
                }
            }
        }
        public int CheckClassificationStatus(int BatchID)
        {
            return 0;
        }
        public void MovePageToNewBatch(List<ClassificationMoveRequest> MoveRequest)
        {
            string OutputFiles = ConfigurationManager.AppSettings["OutputFiles"].ToString();
            MoveRequest.ForEach(q =>
            {
                string SourceFile = OutputFiles + q.oldPath;
                string DestinationFile = OutputFiles + q.newPath;
                DestinationFile = GetNonDublicatePath(DestinationFile);
                File.Move(SourceFile, DestinationFile);
            });
        }
        private string GetNonDublicatePath(string DestinationFile)
        {
            string FileDirectory = Path.GetDirectoryName(DestinationFile);
            string FileName = Path.GetFileNameWithoutExtension(DestinationFile);
            string FileExtension = Path.GetExtension(DestinationFile);
            string[] FileNameCollection = FileName.Split('~');
            int FileIndex = Convert.ToInt32(FileNameCollection.Select(n => Convert.ToInt32(n)).Last());

            while (File.Exists(DestinationFile))
            {
                FileIndex = FileIndex + 1;
                FileNameCollection[FileNameCollection.Count() - 1] = Convert.ToString(FileIndex);
                string NewFileName = string.Join("~", FileNameCollection);
                DestinationFile = Path.Combine(FileDirectory, NewFileName + FileExtension);
            }
            return DestinationFile;
        }
        private void moveFiles(string SourceFile, string DestinationFile)
        {
            if (File.Exists(DestinationFile))
            {
                string NewSourceFile = Path.GetFileName(DestinationFile);
                string NewDestinationFile = this.UpdatedPages
                    .Where(q => q.OriginalName == NewSourceFile)
                    .Select(q =>
                    {
                        q.IsUpdated = true;
                        return q.UpdatedName;
                    }).FirstOrDefault().ToString();

                string NewSourceFilePath = Path.Combine(this.ImagesFolderPath, NewSourceFile);
                string NewDestinationFilePath = Path.Combine(this.ImagesFolderPath, NewDestinationFile);

                this.moveFiles(NewSourceFilePath, NewDestinationFilePath);
            }
            File.Move(SourceFile, DestinationFile);
        }
    }
}
