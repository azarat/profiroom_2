import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreefMessageShowingComponent } from './breef-message-showing.component';

describe('BreefMessageShowingComponent', () => {
  let component: BreefMessageShowingComponent;
  let fixture: ComponentFixture<BreefMessageShowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreefMessageShowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreefMessageShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
