import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageListComponent } from './message-list.component';

describe('MessageListComponent', () => {
  let component: MassageListComponent;
  let fixture: ComponentFixture<MassageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
