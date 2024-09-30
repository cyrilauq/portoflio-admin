import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { ProjectMiniatureComponent } from './project-miniature.component';
import { provideRouter } from '@angular/router';
import ProjectMiniatureService from './projectMiniatureService';
import Project from '../../../core/models/project';
import Link from '../../../core/models/link';
import { By } from '@angular/platform-browser';

const testProject = Project.fromObject({
  id: '1',
  name: "Test title",
  description: "Test description",
  links: [Link.fromObject({ name: "test link", 'link': 'www.google.com' })],
  technologies: ["Test techno"]
});
describe('ProjectMiniatureComponent', () => {
  let component: ProjectMiniatureComponent;
  let fixture: ComponentFixture<ProjectMiniatureComponent>;

  let miniatureService: ProjectMiniatureService

  beforeEach(async () => {
    miniatureService = new ProjectMiniatureService()
    await TestBed.configureTestingModule({
      imports: [ProjectMiniatureComponent],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        provideRouter([]), 
        { 
          provide: ProjectMiniatureService, 
          useValue: miniatureService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMiniatureComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', testProject)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    const fixture = TestBed.createComponent(ProjectMiniatureComponent);
    fixture.componentRef.setInput('project', testProject)
    fixture.detectChanges();
    
    expect(component.project).toBe(testProject)

    expect(fixture.debugElement.query(By.css('.project-title')).nativeElement.textContent).toEqual(testProject.name)
  })

  it('when delete is clicked then should update service\'s observable value', () => {
    let projectId: string | undefined = undefined
    miniatureService.getDeletedProject().subscribe(id => projectId = id)
    fixture.debugElement.query(By.css('.project-delete-btn')).nativeElement.click()

    expect(projectId).not.toBeUndefined()
    expect(projectId!).toEqual(testProject.id)
  })

  it('when edit is clicked then should update service\'s observable value', () => {
    let projectId: string | undefined = undefined
    miniatureService.getEditedProject().subscribe(id => projectId = id)
    fixture.debugElement.query(By.css('.project-edit-btn')).nativeElement.click()

    expect(projectId).not.toBeUndefined()
    expect(projectId!).toEqual(testProject.id)
  })
});
