import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityMailUserSettingsComponent } from './security-mail-user-settings.component';

describe('SecurityMailUserSettingsComponent', () => {
  let component: SecurityMailUserSettingsComponent;
  let fixture: ComponentFixture<SecurityMailUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityMailUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityMailUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
