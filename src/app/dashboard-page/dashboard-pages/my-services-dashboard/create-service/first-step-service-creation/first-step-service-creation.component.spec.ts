import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstStepServiceCreationComponent } from './first-step-service-creation.component';

describe('FirstStepServiceCreationComponent', () => {
  let component: FirstStepServiceCreationComponent;
  let fixture: ComponentFixture<FirstStepServiceCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstStepServiceCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstStepServiceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
