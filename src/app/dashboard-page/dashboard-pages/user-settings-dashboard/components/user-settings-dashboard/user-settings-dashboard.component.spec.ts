import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsDashboardComponent } from './user-settings-dashboard.component';

describe('UserSettingsDashboardComponent', () => {
  let component: UserSettingsDashboardComponent;
  let fixture: ComponentFixture<UserSettingsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
