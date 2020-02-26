import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChartCanvasComponent } from './admin-chart-canvas.component';

describe('AdminChartCanvasComponent', () => {
  let component: AdminChartCanvasComponent;
  let fixture: ComponentFixture<AdminChartCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChartCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChartCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
