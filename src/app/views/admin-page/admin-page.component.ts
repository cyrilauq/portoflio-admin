import { Component, Inject, OnInit} from '@angular/core';
import { FormAddProjectComponent } from '../../component/form/form-add-project/form-add-project.component';
import { ProjectSubmittedArgs } from '../../component/form/form-add-project/ProjectSubmittedArgs';
import { ProjectMiniatureComponent } from '../../component/miniature/project-miniature/project-miniature.component';
import { NgFor } from '@angular/common';
import Project from '../../core/models/project';
import IProjectService from '../../core/services/interfaces/iProjectService';
import { POJECT_SERVICE_TOKEN } from '../../list-token'

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormAddProjectComponent, ProjectMiniatureComponent, NgFor],
  templateUrl: './admin-page.component.html',
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
    this.myService.getProjects().subscribe({
      next: (projects) => {
        this.count = projects.length
        this.projects = projects
      },
      error: (err) => alert(err)
    })
  }

  onProjectSubmitted(args: ProjectSubmittedArgs) {
    this.myService.createProject(
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
