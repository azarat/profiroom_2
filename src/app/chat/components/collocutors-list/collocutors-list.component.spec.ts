import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollocutorsListComponent } from './collocutors-list.component';

describe('CollocutorsListComponent', () => {
  let component: CollocutorsListComponent;
  let fixture: ComponentFixture<CollocutorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollocutorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollocutorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
