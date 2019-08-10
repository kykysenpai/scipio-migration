import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsStatisticsComponent } from './payments-statistics.component';

describe('PaymentsStatisticsComponent', () => {
  let component: PaymentsStatisticsComponent;
  let fixture: ComponentFixture<PaymentsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
