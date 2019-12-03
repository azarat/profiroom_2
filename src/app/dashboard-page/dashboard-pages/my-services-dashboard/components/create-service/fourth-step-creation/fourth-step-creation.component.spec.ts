import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthStepCreationComponent } from './fourth-step-creation.component';

describe('FourthStepCreationComponent', () => {
  let component: FourthStepCreationComponent;
  let fixture: ComponentFixture<FourthStepCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourthStepCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourthStepCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
