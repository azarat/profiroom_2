import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelacerAchivesComponent } from './freelacer-achives.component';

describe('FreelacerAchivesComponent', () => {
  let component: FreelacerAchivesComponent;
  let fixture: ComponentFixture<FreelacerAchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelacerAchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelacerAchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
