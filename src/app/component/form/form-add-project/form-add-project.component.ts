import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import Project from '../../../core/models/project';
import { ProjectSubmittedArgs } from './ProjectSubmittedArgs';
import Link from '../../../core/models/link';
import { PreventDefaultDirective } from '../../../shared/directives/preventDefaultDirective';

@Component({
  selector: 'app-form-add-project',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, PreventDefaultDirective, NgFor],
  templateUrl: './form-add-project.component.html',
  styleUrl: './form-add-project.component.css'
})
export class FormAddProjectComponent {
  step = 0
  miniatureFile: File | undefined
  screenShotsFiles: Array<File> = []
  technologies: Array<string> = []
  links: Array<Link> = []
  public projectForm = new FormGroup({
    title_control: new FormControl(''),
    description_control: new FormControl(''),
    live_link_control: new FormControl(''),
    technologie_control: new FormControl(''),
    link_src_control: new FormControl(''),
    link_title_control: new FormControl('')
  })


  @Output() formSubmitted = new EventEmitter<ProjectSubmittedArgs>()

  onPrevious() {
    if(this.step > 0) {
      this.step--
    }
  }

  onNext() {
    this.step++
  }

  onSubmit() {
    this.formSubmitted.emit({
      project: Project.fromObject({
        id: '1',
        name: this.projectForm.get('title_control')?.value || "",
        description: this.projectForm.get('description_control')?.value || "",
        links: [...this.links],
        technologies: [...this.technologies]
      }),
      miniature: this.miniatureFile || File.prototype,
      screenshots: this.screenShotsFiles
    })
  }

  onTechnoAddClicked() {
    this.technologies.push(this.projectForm.get('technologie_control')!.value!)
  }

  onLinkAddClicked() {
    this.links.push(Link.fromObject({ link: this.projectForm.get('link_src_control')!.value!, name: this.projectForm.get('link_title_control')!.value!}))
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
