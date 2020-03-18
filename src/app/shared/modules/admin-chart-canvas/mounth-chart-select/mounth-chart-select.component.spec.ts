import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MounthChartSelectComponent } from './mounth-chart-select.component';

describe('MounthChartSelectComponent', () => {
  let component: MounthChartSelectComponent;
  let fixture: ComponentFixture<MounthChartSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MounthChartSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MounthChartSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
