import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageServicesComponent } from './user-page-services.component';

describe('UserPageServicesComponent', () => {
  let component: UserPageServicesComponent;
  let fixture: ComponentFixture<UserPageServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
