import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-form-add-project',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './form-add-project.component.html',
  styleUrl: './form-add-project.component.css'
})
export class FormAddProjectComponent {
  step = 0
  public projectForm = new FormGroup({
    title_control: new FormControl(''),
    description_control: new FormControl(''),
    live_link_control: new FormControl(''),
    technologie_control: new FormControl(''),
    link_src_control: new FormControl(''),
    link_title_control: new FormControl('')
  })

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

  onSubmit() {}
}
