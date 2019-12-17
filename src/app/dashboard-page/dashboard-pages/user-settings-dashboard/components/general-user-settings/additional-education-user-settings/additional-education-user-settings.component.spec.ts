import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalEducationUserSettingsComponent } from './additional-education-user-settings.component';

describe('AdditionalEducationUserSettingsComponent', () => {
  let component: AdditionalEducationUserSettingsComponent;
  let fixture: ComponentFixture<AdditionalEducationUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalEducationUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalEducationUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
