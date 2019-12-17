import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserSettingsComponent } from './home-user-settings.component';

describe('HomeUserSettingsComponent', () => {
  let component: HomeUserSettingsComponent;
  let fixture: ComponentFixture<HomeUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
