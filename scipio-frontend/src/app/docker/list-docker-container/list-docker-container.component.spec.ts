import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDockerContainerComponent } from './list-docker-container.component';

describe('ListDockerContainerComponent', () => {
  let component: ListDockerContainerComponent;
  let fixture: ComponentFixture<ListDockerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDockerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDockerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
