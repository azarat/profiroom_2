import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdStepCreationComponent } from './third-step-creation.component';

describe('ThirdStepCreationComponent', () => {
  let component: ThirdStepCreationComponent;
  let fixture: ComponentFixture<ThirdStepCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdStepCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdStepCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
