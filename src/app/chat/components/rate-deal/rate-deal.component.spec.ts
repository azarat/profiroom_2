import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RateDealComponent } from './rate-deal.component';



describe('RateDealComponent', () => {
  let component: RateDealComponent;
  let fixture: ComponentFixture<RateDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
