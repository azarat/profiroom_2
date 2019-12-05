import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUserSettingsComponent } from './general-user-settings.component';

describe('GeneralUserSettingsComponent', () => {
  let component: GeneralUserSettingsComponent;
  let fixture: ComponentFixture<GeneralUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
