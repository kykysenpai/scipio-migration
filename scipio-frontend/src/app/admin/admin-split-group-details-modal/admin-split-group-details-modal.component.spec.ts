import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSplitGroupDetailsModalComponent } from './admin-split-group-details-modal.component';

describe('AdminSplitGroupDetailsModalComponent', () => {
  let component: AdminSplitGroupDetailsModalComponent;
  let fixture: ComponentFixture<AdminSplitGroupDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSplitGroupDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSplitGroupDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
