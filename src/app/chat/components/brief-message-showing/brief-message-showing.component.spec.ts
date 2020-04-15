import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefMessageShowingComponent } from './brief-message-showing.component';

describe('BriefMessageShowingComponent', () => {
  let component: BriefMessageShowingComponent;
  let fixture: ComponentFixture<BriefMessageShowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefMessageShowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefMessageShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
