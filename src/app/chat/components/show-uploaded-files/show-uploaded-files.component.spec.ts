import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUploadedFilesComponent } from './show-uploaded-files.component';

describe('ShowUploadedFilesComponent', () => {
  let component: ShowUploadedFilesComponent;
  let fixture: ComponentFixture<ShowUploadedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUploadedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUploadedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
