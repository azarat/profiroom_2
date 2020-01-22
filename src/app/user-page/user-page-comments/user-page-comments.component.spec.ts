import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageCommentsComponent } from './user-page-comments.component';

describe('UserPageCommentsComponent', () => {
  let component: UserPageCommentsComponent;
  let fixture: ComponentFixture<UserPageCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
