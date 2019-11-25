import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePagePackagesComponent } from './service-page-packages.component';

describe('ServicePagePackagesComponent', () => {
  let component: ServicePagePackagesComponent;
  let fixture: ComponentFixture<ServicePagePackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePagePackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePagePackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
