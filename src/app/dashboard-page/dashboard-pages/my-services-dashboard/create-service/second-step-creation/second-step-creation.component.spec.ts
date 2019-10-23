import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondStepCreationComponent } from './second-step-creation.component';

describe('SecondStepCreationComponent', () => {
  let component: SecondStepCreationComponent;
  let fixture: ComponentFixture<SecondStepCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondStepCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondStepCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
