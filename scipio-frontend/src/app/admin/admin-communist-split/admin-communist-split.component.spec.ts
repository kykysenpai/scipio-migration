import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommunistSplitComponent } from './admin-communist-split.component';

describe('AdminCommunistSplitComponent', () => {
  let component: AdminCommunistSplitComponent;
  let fixture: ComponentFixture<AdminCommunistSplitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommunistSplitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommunistSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
