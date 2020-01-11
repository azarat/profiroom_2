import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsUserSettingsComponent } from './notifications-user-settings.component';

describe('NotificationsUserSettingsComponent', () => {
  let component: NotificationsUserSettingsComponent;
  let fixture: ComponentFixture<NotificationsUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
