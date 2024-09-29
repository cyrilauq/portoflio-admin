import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import ProjectService from '../../../core/services/projectService';
import Project from '../../../core/models/project';
import { ProjectSubmittedArgs } from './ProjectSubmittedArgs';

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


  @Output() formSubmitted = new EventEmitter<ProjectSubmittedArgs>()

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
    this.formSubmitted.emit({
      project: Project.fromObject({
        id: '1',
        name: this.projectForm.get('title_control')?.value || "",
        description: this.projectForm.get('description_control')?.value || "",
        links: [{ name: 'front-end', link: 'https://github.com/cyrilauq/cyrilauq.github.io' }],
        technologies: ['Vue JS 3', 'HTML', 'CSS', 'TypeScript', 'Firebase']
      }),
      miniature: this.miniatureFile || File.prototype,
      screenshots: this.screenShotsFiles
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
