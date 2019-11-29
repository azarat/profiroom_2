import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageEarlierViewedComponent } from './service-page-earlier-viewed.component';

describe('ServicePageEarlierViewedComponent', () => {
  let component: ServicePageEarlierViewedComponent;
  let fixture: ComponentFixture<ServicePageEarlierViewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePageEarlierViewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePageEarlierViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
