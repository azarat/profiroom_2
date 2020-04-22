import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrationPageComponent } from './arbitration-page.component';

describe('ArbitrationPageComponent', () => {
  let component: ArbitrationPageComponent;
  let fixture: ComponentFixture<ArbitrationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbitrationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
