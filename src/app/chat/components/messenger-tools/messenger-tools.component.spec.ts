import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassagerToolsComponent } from './massager-tools.component';

describe('MassagerToolsComponent', () => {
  let component: MassagerToolsComponent;
  let fixture: ComponentFixture<MassagerToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassagerToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassagerToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
