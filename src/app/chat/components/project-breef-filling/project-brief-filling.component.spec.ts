import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBriefFillingComponent } from './project-brief-filling.component';

describe('ProjectBriefFillingComponent', () => {
  let component: ProjectBriefFillingComponent;
  let fixture: ComponentFixture<ProjectBriefFillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBriefFillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBriefFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
