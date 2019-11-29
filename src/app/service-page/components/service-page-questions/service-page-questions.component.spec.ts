import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageQuestionsComponent } from './service-page-questions.component';

describe('QuestionsComponent', () => {
  let component: ServicePageQuestionsComponent;
  let fixture: ComponentFixture<ServicePageQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePageQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePageQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
