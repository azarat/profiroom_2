import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBreefFillingComponent } from './project-breef-filling.component';

describe('ProjectBreefFillingComponent', () => {
  let component: ProjectBreefFillingComponent;
  let fixture: ComponentFixture<ProjectBreefFillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBreefFillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBreefFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
