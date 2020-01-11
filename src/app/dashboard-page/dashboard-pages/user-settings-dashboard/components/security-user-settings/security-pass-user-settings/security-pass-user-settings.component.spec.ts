import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPassUserSettingsComponent } from './security-pass-user-settings.component';

describe('SecurityPassUserSettingsComponent', () => {
  let component: SecurityPassUserSettingsComponent;
  let fixture: ComponentFixture<SecurityPassUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityPassUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPassUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
