import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthStepCreationComponent } from './fifth-step-creation.component';

describe('FifthStepCreationComponent', () => {
  let component: FifthStepCreationComponent;
  let fixture: ComponentFixture<FifthStepCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FifthStepCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FifthStepCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
