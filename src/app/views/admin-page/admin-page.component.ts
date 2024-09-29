import { Component, OnInit} from '@angular/core';
import { FormAddProjectComponent } from '../../component/form/form-add-project/form-add-project.component';
import ProjectService from '../../core/services/projectService';
import { ProjectSubmittedArgs } from '../../component/form/form-add-project/ProjectSubmittedArgs';
import { ProjectMiniatureComponent } from '../../component/miniature/project-miniature/project-miniature.component';
import { NgFor } from '@angular/common';
import Project from '../../core/models/project';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormAddProjectComponent, ProjectMiniatureComponent, NgFor],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
  count = 0
  createFormIsVisible = false
  projects = Array<Project>(0)
  
  constructor(private myService: ProjectService) {}

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
