import { NgModule } from '@angular/core';
// services
import { HelperService } from './helper-service/helper.service';
import { UploadService } from './upload-service/upload.service';
import { CSVService } from './csv-service/csv.service';
import { BatchImageService } from './batch-image-service/batch-image.service';



@NgModule({
    providers: [HelperService, UploadService, CSVService, BatchImageService],
})
export class CoreModule { }
