import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IframePaymentComponent } from './iframe-payment.component';

describe('IframePaymentComponent', () => {
  let component: IframePaymentComponent;
  let fixture: ComponentFixture<IframePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IframePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
