import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLeftProcessComponent } from './nav-left-process.component';

describe('NavLeftProcessComponent', () => {
  let component: NavLeftProcessComponent;
  let fixture: ComponentFixture<NavLeftProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavLeftProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLeftProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
