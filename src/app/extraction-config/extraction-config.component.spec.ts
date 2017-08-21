import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractionConfigComponent } from './extraction-config.component';

describe('ExtractionConfigComponent', () => {
  let component: ExtractionConfigComponent;
  let fixture: ComponentFixture<ExtractionConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractionConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
