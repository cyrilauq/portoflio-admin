import { Component, Input } from '@angular/core';
import Project from '../../../core/models/project';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-project-miniature',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './project-miniature.component.html',
  styleUrl: './project-miniature.component.css'
})
export class ProjectMiniatureComponent {
  @Input({ required: true }) project!: Project;
}
