import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsDashboardMainComponent } from './user-settings-dashboard-main.component';

describe('UserSettingsDashboardMainComponent', () => {
  let component: UserSettingsDashboardMainComponent;
  let fixture: ComponentFixture<UserSettingsDashboardMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingsDashboardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsDashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
