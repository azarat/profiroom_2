import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartDashboardComponent } from './pie-chart-dashboard.component';

describe('PieChartDashboardComponent', () => {
  let component: PieChartDashboardComponent;
  let fixture: ComponentFixture<PieChartDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
