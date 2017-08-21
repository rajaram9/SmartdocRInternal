import { Component, OnInit } from '@angular/core';
import { ClientDocumentsMappingService } from './client-documents-mapping.service';

@Component({
  selector: 'si-client-documents-mapping',
  templateUrl: 'client-documents-mapping.component.html'
})
export class ClientDocumentsMappingComponent implements OnInit {
  keepSorted = true;

  key: string;
  display: string;
  source: Array<any> = [];
  confirmed: Array<any> = [];

  sourceStations: Array<any>;
  sourceChessmen: Array<any>;

  confirmedStations: Array<any>;
  confirmedChessmen: Array<any>;

  toggle = true;

  userAdd = '';

  stations: Array<any> = [];

  chessmen: Array<any> = [];

  selectedClientID: any;
  selectedClients: string;

  constructor(private clientdocumentsmappingService: ClientDocumentsMappingService) {
  }

  ngOnInit() {
    this.getDocTypes();
  }

  getDocTypes() {
    this.clientdocumentsmappingService.getDocumentTypes().subscribe((clientDocTypes: any[]) => {
      const formatedClientDocType = clientDocTypes.map(docType => {
        return {
          key: docType.cst_DocTypeID,
          station: docType.docTypeName
        };
      });
      this.stations = formatedClientDocType;

      this.doReset();
    });
  }

  useStations() {
    this.toggle = true;
    this.key = 'key';
    this.display = 'station';
    this.keepSorted = true;
    this.source = this.sourceStations;
    this.confirmed = this.confirmedStations;
  }

  useChessmen() {
    this.toggle = false;
    this.key = '_id';
    this.display = 'name';
    this.keepSorted = false;
    this.source = this.sourceChessmen;
    this.confirmed = this.confirmedChessmen;
  }

  doSwap() {
    if (this.toggle) {
      this.useChessmen();
    } else {
      this.useStations();
    }
  }

  doReset() {
    this.sourceChessmen = JSON.parse(JSON.stringify(this.chessmen));
    this.sourceStations = JSON.parse(JSON.stringify(this.stations));
    this.confirmedChessmen = new Array<any>();
    this.confirmedStations = new Array<any>();

    if (this.toggle) {
      this.getClientDocMappings();
      // this.confirmedStations.push({ key: 7035, station: 'ABILITY TO REPAY WORKSHEET' });
    } else {
      this.useChessmen();
    }
  }

  doDelete() {
    if (this.source.length > 0) {
      this.source.splice(0, 1);
    }
  }

  doCreate() {
    const o: any = {};
    o[this.key] = this.source.length + 1;
    o[this.display] = this.userAdd;
    this.source.push(o);
    this.userAdd = '';
  }

  doAdd() {
    for (let i = 0; i < this.source.length; i += 1) {
      const o = this.source[i];
      const found = this.confirmed.find((e: any) => e[this.key] === o[this.key]);
      if (!found) {
        this.confirmed.push(o);
        break;
      }
    }
  }

  doRemove() {
    if (this.confirmed.length > 0) {
      this.confirmed.splice(0, 1);
    }
  }

  onsearch(keyword: string) {
    this.selectedClients = keyword;
    this.getClientDocMappings();
  }
  getClientDocMappings() {
    this.clientdocumentsmappingService.getClientDocumentsMappings().subscribe((clientDocDetails: any[]) => {

      this.selectedClientID = clientDocDetails.filter(Clientdocument => Clientdocument.clientid === this.selectedClients);
      if (this.selectedClientID.length > 0) {
        this.confirmedStations = this.stations.filter(station => {
          if ((this.selectedClientID[0].documentIDs.indexOf(station.key) > -1)) {
            return station;
          }
        });
      } else {
        this.confirmedStations = [];
        this.useStations();
      }
      this.useStations();
    });
  }
}
