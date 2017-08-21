import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchMoveComponent } from './batch-move.component';

describe('BatchMoveComponent', () => {
  let component: BatchMoveComponent;
  let fixture: ComponentFixture<BatchMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
