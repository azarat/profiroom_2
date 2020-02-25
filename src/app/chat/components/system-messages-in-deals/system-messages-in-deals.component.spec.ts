import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMessagesInDealsComponent } from './system-messages-in-deals.component';

describe('SystemMessagesInDealsComponent', () => {
  let component: SystemMessagesInDealsComponent;
  let fixture: ComponentFixture<SystemMessagesInDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMessagesInDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMessagesInDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
