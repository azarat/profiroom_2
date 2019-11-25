import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageAboutOfferComponent } from './service-page-about-offer.component';

describe('AboutOfferComponent', () => {
  let component: ServicePageAboutOfferComponent;
  let fixture: ComponentFixture<ServicePageAboutOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePageAboutOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePageAboutOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
