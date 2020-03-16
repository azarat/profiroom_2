import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDealComponent } from './reait-deal.component';

describe('ReaitDealComponent', () => {
  let component: RateDealComponent;
  let fixture: ComponentFixture<RateDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
