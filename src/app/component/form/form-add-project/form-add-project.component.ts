import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-add-project',
  standalone: true,
  imports: [NgIf],
  templateUrl: './form-add-project.component.html',
  styleUrl: './form-add-project.component.css'
})
export class FormAddProjectComponent {
  step = 0

  onPrevious(event: Event) {
    event.preventDefault()
    if(this.step > 0) {
      this.step--
    }
  }

  onNext(event: Event) {
    event.preventDefault()
    this.step++
  }
}
