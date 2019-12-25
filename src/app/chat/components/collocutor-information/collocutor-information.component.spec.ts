import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollocutorInformationComponent } from './collocutor-information.component';

describe('CollocutorInformationComponent', () => {
  let component: CollocutorInformationComponent;
  let fixture: ComponentFixture<CollocutorInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollocutorInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollocutorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
