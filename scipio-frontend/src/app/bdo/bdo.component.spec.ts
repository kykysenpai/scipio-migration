import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdoComponent } from './bdo.component';

describe('BdoComponent', () => {
  let component: BdoComponent;
  let fixture: ComponentFixture<BdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
