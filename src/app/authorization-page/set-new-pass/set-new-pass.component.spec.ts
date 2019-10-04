import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNewPassComponent } from './set-new-pass.component';

describe('SetNewPassComponent', () => {
  let component: SetNewPassComponent;
  let fixture: ComponentFixture<SetNewPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetNewPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNewPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
