import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagerToolsComponent } from './messager-tools.component';

describe('MessagerToolsComponent', () => {
  let component: MessagerToolsComponent;
  let fixture: ComponentFixture<MessagerToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagerToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagerToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
