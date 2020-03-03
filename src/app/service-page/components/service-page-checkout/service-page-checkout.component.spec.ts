import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageCheckoutComponent } from './service-page-checkout.component';

describe('ServicePageCheckoutComponent', () => {
  let component: ServicePageCheckoutComponent;
  let fixture: ComponentFixture<ServicePageCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePageCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePageCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
