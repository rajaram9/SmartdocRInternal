import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

const mockClient = [
  {
    name: 'Test Client1',
    id: 1
  }, {
    name: 'Test Client2',
    id: 2
  }
];

@Injectable()
export class SelectClientService {

  mockClient = new Subject<any[]>();
  mockClient$ = this.mockClient.asObservable();

  constructor() { }

  getClientList() {
    return mockClient;
  }

}



