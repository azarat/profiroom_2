import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollocutorListComponent } from './collocutor-list.component';

describe('CollocutorListComponent', () => {
  let component: CollocutorListComponent;
  let fixture: ComponentFixture<CollocutorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollocutorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollocutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
