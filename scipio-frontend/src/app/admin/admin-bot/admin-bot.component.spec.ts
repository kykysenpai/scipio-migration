import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBotComponent } from './admin-bot.component';

describe('AdminBotComponent', () => {
  let component: AdminBotComponent;
  let fixture: ComponentFixture<AdminBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
