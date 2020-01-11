import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceUserSettingsComponent } from './finance-user-settings.component';

describe('FinanceUserSettingsComponent', () => {
  let component: FinanceUserSettingsComponent;
  let fixture: ComponentFixture<FinanceUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
