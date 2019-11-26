import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageAnotherServicesComponent } from './service-page-another-services.component';

describe('ServicePageAnotherServicesComponent', () => {
  let component: ServicePageAnotherServicesComponent;
  let fixture: ComponentFixture<ServicePageAnotherServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePageAnotherServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePageAnotherServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
