import { Component, Input } from '@angular/core';
import Project from '../../../core/models/project';
import { NgFor } from '@angular/common';
import { ProjectMiniatureComponent } from '../../miniature/project-miniature/project-miniature.component';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [ProjectMiniatureComponent, NgFor],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent {
  @Input("projects") projects!: Array<Project>
}
