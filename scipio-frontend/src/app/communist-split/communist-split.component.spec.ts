import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunistSplitComponent } from './communist-split.component';

describe('CommunistSplitComponent', () => {
  let component: CommunistSplitComponent;
  let fixture: ComponentFixture<CommunistSplitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunistSplitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunistSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
