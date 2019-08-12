import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSavedDockerContainerComponent } from './create-saved-docker-container.component';

describe('CreateSavedDockerContainerComponent', () => {
  let component: CreateSavedDockerContainerComponent;
  let fixture: ComponentFixture<CreateSavedDockerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSavedDockerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSavedDockerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
