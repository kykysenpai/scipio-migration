import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSavedDockerContainerComponent } from './list-saved-docker-container.component';

describe('ListSavedDockerContainerComponent', () => {
  let component: ListSavedDockerContainerComponent;
  let fixture: ComponentFixture<ListSavedDockerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSavedDockerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSavedDockerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
