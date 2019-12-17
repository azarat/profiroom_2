import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUserSettingsComponent } from './main-user-settings.component';

describe('MainUserSettingsComponent', () => {
  let component: MainUserSettingsComponent;
  let fixture: ComponentFixture<MainUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
