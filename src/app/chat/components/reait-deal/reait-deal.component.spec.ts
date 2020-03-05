import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaitDealComponent } from './reait-deal.component';

describe('ReaitDealComponent', () => {
  let component: ReaitDealComponent;
  let fixture: ComponentFixture<ReaitDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaitDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaitDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
