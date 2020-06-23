import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerToolsComponent } from './messenger-tools.component';

describe('MassagerToolsComponent', () => {
  let component: MessengerToolsComponent;
  let fixture: ComponentFixture<MessengerToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
