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
import { SaveSkillFormComponent, SaveSkillFormSubmitArgs } from '../../component/form/save-skill-form/save-skill-form.component';
import SkillService from '../../core/services/skillService';
import Skill from '../../core/models/skill';
import { PreventDefaultDirective } from '../../shared/directives/preventDefaultDirective';
import { ActionButtonComponent } from "../../component/global/action-button/action-button.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormAddProjectComponent, ProjectsSectionComponent, SaveSkillFormComponent, NgFor, PreventDefaultDirective, ActionButtonComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
  providers: [
    {
      provide: POJECT_SERVICE_TOKEN, useValue: ProjectService
    }
  ]
})
export class AdminPageComponent implements OnInit {
  projectCount = 0
  skillCount = 0
  createFormIsVisible = false
  saveSkillFormIsVisible = false
  projects = Array<Project>(0)
  skills = Array<Skill>(0)
  
  constructor(private projectService: ProjectService, private skillService: SkillService, private miniatureService: ProjectMiniatureService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projectCount = projects.length
        this.projects = projects
      },
      error: (err) => alert(err)
    })
    this.skillService.getSkills().subscribe({
      next: (skills) => {
        this.skillCount = skills.length
        this.skills = skills
      },
      error: alert
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

  onSkillSubmitted(args: SaveSkillFormSubmitArgs) {
    this.skillService.insert({
      name: args.skillName,
      expertise: args.skillExperise,
      type: args.skillType
    })
    .subscribe({
      next: value => {
        if(value) {
          this.saveSkillFormIsVisible = false
        }
      },
      error: alert
    })
  }

  onCreateBtnClicked() {
    this.createFormIsVisible = !this.createFormIsVisible
  }

  onSaveSkillBtnClicked() {
    this.saveSkillFormIsVisible = !this.saveSkillFormIsVisible
  }
  
  onDeleteSkill(skillName: string) {
    this.skillService.delete(skillName)
    .subscribe({
      next: value => value && alert("Skill sucessfully deleted"),
      error: alert
    })
  }
}
