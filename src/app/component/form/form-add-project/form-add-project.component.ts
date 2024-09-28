import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import ProjectService from '../../../core/services/projectService';
import Project from '../../../core/models/project';

@Component({
  selector: 'app-form-add-project',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './form-add-project.component.html',
  styleUrl: './form-add-project.component.css'
})
export class FormAddProjectComponent {
  step = 0
  miniatureFile: File | undefined
  screenShotsFiles: Array<File> = []
  public projectForm = new FormGroup({
    title_control: new FormControl(''),
    description_control: new FormControl(''),
    live_link_control: new FormControl(''),
    technologie_control: new FormControl(''),
    link_src_control: new FormControl(''),
    link_title_control: new FormControl('')
  })

  constructor(private myService: ProjectService) {}

  onPrevious(event: MouseEvent) {
    event.preventDefault()
    if(this.step > 0) {
      this.step--
    }
  }

  onNext(event: MouseEvent) {
    event.preventDefault()
    this.step++
  }

  onSubmit() {
    this.myService.createProject(
      Project.fromObject({
        id: '1',
        name: this.projectForm.get('title_control')?.value || "",
        description: this.projectForm.get('description_control')?.value || "",
        links: [{ name: 'front-end', link: 'https://github.com/cyrilauq/cyrilauq.github.io' }],
        technologies: ['Vue JS 3', 'HTML', 'CSS', 'TypeScript', 'Firebase']
      }),
      this.miniatureFile || File.prototype,
      this.screenShotsFiles)
    .subscribe({
      error: alert
    })
  }

  onMiniatureSelected(event: Event) {
    const file: File = (event?.target as any).files[0];

    if (file) {
      this.miniatureFile = file
    }
  }

  onScreenshotsChange(event: Event) {
    const files: File[] = (event?.target as any).files;

    if (files && files.length > 0) {
      this.screenShotsFiles.push(...files)
    }
  }
}
