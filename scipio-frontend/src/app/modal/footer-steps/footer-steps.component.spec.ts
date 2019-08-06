import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStepsComponent } from './footer-steps.component';

describe('FooterStepsComponent', () => {
  let component: FooterStepsComponent;
  let fixture: ComponentFixture<FooterStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
