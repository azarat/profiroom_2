import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayUserSettingsComponent } from './birthday-user-settings.component';

describe('BirthdayUserSettingsComponent', () => {
  let component: BirthdayUserSettingsComponent;
  let fixture: ComponentFixture<BirthdayUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthdayUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
