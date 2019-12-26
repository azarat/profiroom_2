import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageCommentsComponent } from './service-page-comments.component';

describe('ServicePageCommentsComponent', () => {
  let component: ServicePageCommentsComponent;
  let fixture: ComponentFixture<ServicePageCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePageCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePageCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
