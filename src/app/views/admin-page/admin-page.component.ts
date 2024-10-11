import { Component, Inject, OnInit} from '@angular/core';
import { FormAddProjectComponent } from '../../component/form/form-add-project/form-add-project.component';
import { ProjectSubmittedArgs } from '../../component/form/form-add-project/ProjectSubmittedArgs';
import { ProjectMiniatureComponent } from '../../component/miniature/project-miniature/project-miniature.component';
import { NgFor } from '@angular/common';
import Project from '../../core/models/project';
import { POJECT_SERVICE_TOKEN } from '../../list-token'
import { ProjectsSectionComponent } from '../../component/sections/projects-section/projects-section.component';
import ProjectService from '../../core/services/projectService';
import ProjectMiniatureService from '../../component/miniature/project-miniature/projectMiniatureService';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormAddProjectComponent, ProjectsSectionComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
  providers: [
    {
      provide: POJECT_SERVICE_TOKEN, useValue: ProjectService
    }
  ]
})
export class AdminPageComponent implements OnInit {
  count = 0
  createFormIsVisible = false
  projects = Array<Project>(0)
  
  constructor(private projectService: ProjectService, private miniatureService: ProjectMiniatureService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.count = projects.length
        this.projects = projects
      },
      error: (err) => alert(err)
    })

    this.miniatureService.getDeletedProject().subscribe({
      next: value => {
        if(value && confirm("Are you sure you want to delete the project?")) {
          this.projectService.deleteProject(value || "").subscribe({
            next: (success) =>  success && alert("Project sucessfully deleted"),
            error: (err) => alert(err)
          })
        }
      },
      error: (err) => alert(err)
    })
    this.miniatureService.getEditedProject().subscribe({
      next: value => {
        if(value) alert(value)
      }
    })
  }

  onProjectSubmitted(args: ProjectSubmittedArgs) {
    this.projectService.createProject(
      args.project,
      args.miniature,
      args.screenshots)
    .subscribe({
      error: alert
    })
  }

  onCreateBtnClicked() {
    this.createFormIsVisible = !this.createFormIsVisible
  }
}
