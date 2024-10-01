import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
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
[x: string]: any;
  step = 0
  miniatureFile: File | undefined
  screenShotsFiles: Array<File> = []
  technologies: Array<string> = []
  links: Array<Link> = []
  public projectForm = new FormGroup({
    title_control: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    description_control: new FormControl('', [
      Validators.required,
      Validators.minLength(25)
    ]),
    live_link_control: new FormControl('', [
      Validators.required
    ]),
    technologie_control: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    link_src_control: new FormControl('', [
      Validators.required
    ]),
    link_title_control: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
  },
{
  updateOn:'blur'
})

  get title_control() {
    return this.projectForm.get('title_control')!;
  }

  get description_control() { 
    return this.projectForm.get('description_control')!;
  }

  get live_link_control() { 
    return this.projectForm.get('live_link_control')!;
  }

  get technologie_control() { 
    return this.projectForm.get('technologie_control')!;
  }

  get link_src_control() { 
    return this.projectForm.get('link_src_control')!;
  }

  get link_title_control() { 
    return this.projectForm.get('link_title_control')!;
  }

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
    this.revalidateFormInputs()
    if(this.projectForm.valid) {
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
    } else {
      alert("One or more fields aren't valid")
    }
  }

  private revalidateFormInputs() {
    this.projectForm.get('title_control')?.markAsDirty()
    this.projectForm.get('description_control')?.markAsDirty()
    this.projectForm.get('technologie_control')?.markAsDirty()
    this.projectForm.get('link_src_control')?.markAsDirty()
    this.projectForm.get('link_title_control')?.markAsDirty()
    this.projectForm.get('live_link_control')?.markAsDirty()
    this.projectForm.updateValueAndValidity()
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

  getError(controlName: string) {
    return Object.keys(this.projectForm.get(controlName)?.errors || [])
  }
}
