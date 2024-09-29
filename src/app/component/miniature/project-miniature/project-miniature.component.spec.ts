import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMiniatureComponent } from './project-miniature.component';
import { provideRouter } from '@angular/router';

describe('ProjectMiniatureComponent', () => {
  let component: ProjectMiniatureComponent;
  let fixture: ComponentFixture<ProjectMiniatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMiniatureComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMiniatureComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', { name: "Test "})
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
