import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartDashboardComponent } from './line-chart-dashboard.component';

describe('LineChartDashboardComponent', () => {
  let component: LineChartDashboardComponent;
  let fixture: ComponentFixture<LineChartDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
