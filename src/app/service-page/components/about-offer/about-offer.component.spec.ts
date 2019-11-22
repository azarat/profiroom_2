import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOfferComponent } from './about-offer.component';

describe('AboutOfferComponent', () => {
  let component: AboutOfferComponent;
  let fixture: ComponentFixture<AboutOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
