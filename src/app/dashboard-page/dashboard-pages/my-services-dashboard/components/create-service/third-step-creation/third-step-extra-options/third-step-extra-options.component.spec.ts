import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdStepExtraOptionsComponent } from './third-step-extra-options.component';

describe('ThirdStepExtraOptionsComponent', () => {
  let component: ThirdStepExtraOptionsComponent;
  let fixture: ComponentFixture<ThirdStepExtraOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdStepExtraOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdStepExtraOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
