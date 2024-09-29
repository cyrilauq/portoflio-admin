import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMiniatureComponent } from './project-miniature.component';

describe('ProjectMiniatureComponent', () => {
  let component: ProjectMiniatureComponent;
  let fixture: ComponentFixture<ProjectMiniatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMiniatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMiniatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
