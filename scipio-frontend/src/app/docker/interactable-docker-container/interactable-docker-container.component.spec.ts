import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractableDockerContainerComponent } from './interactable-docker-container.component';

describe('InteractableDockerContainerComponent', () => {
  let component: InteractableDockerContainerComponent;
  let fixture: ComponentFixture<InteractableDockerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractableDockerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractableDockerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
