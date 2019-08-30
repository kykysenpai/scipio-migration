import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRunningDockerContainerComponent } from './details-running-docker-container.component';

describe('DetailsRunningDockerContainerComponent', () => {
  let component: DetailsRunningDockerContainerComponent;
  let fixture: ComponentFixture<DetailsRunningDockerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRunningDockerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRunningDockerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
