import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformPopupComponent } from './inform-popup.component';

describe('InformPopupComponent', () => {
  let component: InformPopupComponent;
  let fixture: ComponentFixture<InformPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
