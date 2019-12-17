import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationUserSettingsComponent } from './education-user-settings.component';

describe('EducationUserSettingsComponent', () => {
  let component: EducationUserSettingsComponent;
  let fixture: ComponentFixture<EducationUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
