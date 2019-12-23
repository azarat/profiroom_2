import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityUserSettingsComponent } from './security-user-settings.component';

describe('SecurityUserSettingsComponent', () => {
  let component: SecurityUserSettingsComponent;
  let fixture: ComponentFixture<SecurityUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
