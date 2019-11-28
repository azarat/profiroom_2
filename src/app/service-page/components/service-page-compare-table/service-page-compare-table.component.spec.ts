import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageCompareTableComponent } from './service-page-compare-table.component';

describe('ServicePageCompareTableComponent', () => {
  let component: ServicePageCompareTableComponent;
  let fixture: ComponentFixture<ServicePageCompareTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePageCompareTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePageCompareTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
