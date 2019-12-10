import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationLanguageUserSettingsComponent } from './location-language-user-settings.component';

describe('LocationLanguageUserSettingsComponent', () => {
  let component: LocationLanguageUserSettingsComponent;
  let fixture: ComponentFixture<LocationLanguageUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationLanguageUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationLanguageUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
