import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastStepCreationComponent } from './last-step-creation.component';

describe('LastStepCreationComponent', () => {
  let component: LastStepCreationComponent;
  let fixture: ComponentFixture<LastStepCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastStepCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastStepCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
