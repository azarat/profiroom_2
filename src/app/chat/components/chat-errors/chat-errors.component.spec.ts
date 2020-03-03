import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatErrorsComponent } from './chat-errors.component';

describe('ChatErrorsComponent', () => {
  let component: ChatErrorsComponent;
  let fixture: ComponentFixture<ChatErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
