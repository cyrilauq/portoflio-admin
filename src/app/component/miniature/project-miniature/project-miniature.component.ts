import { Component, EventEmitter, Input, Output } from '@angular/core';
import Project from '../../../core/models/project';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PreventDefaultDirective } from '../../../shared/directives/preventDefaultDirective';
import ProjectMiniatureService from './projectMiniatureService';

@Component({
  selector: 'app-project-miniature',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, PreventDefaultDirective],
  templateUrl: './project-miniature.component.html',
  styleUrl: './project-miniature.component.css'
})
export class ProjectMiniatureComponent {
  @Input({ required: true }) project!: Project;

  constructor(private miniatureService: ProjectMiniatureService) {}

  onDeleteClicked() {
    this.miniatureService.deleteProject(this.project.id)
  }

  onEditClicked() {
    this.miniatureService.editProject(this.project.id)
  }
}
