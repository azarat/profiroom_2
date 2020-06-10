import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageSimilarOffersComponent } from './service-page-similar-offers.component';

describe('ServicePageEarlierViewedComponent', () => {
  let component: ServicePageSimilarOffersComponent;
  let fixture: ComponentFixture<ServicePageSimilarOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePageSimilarOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePageSimilarOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
