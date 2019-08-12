import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSavedDockerContainerComponent } from './details-saved-docker-container.component';

describe('DetailsSavedDockerContainerComponent', () => {
  let component: DetailsSavedDockerContainerComponent;
  let fixture: ComponentFixture<DetailsSavedDockerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSavedDockerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSavedDockerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
