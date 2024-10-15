import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import IFormEmitter from '../IFormEmitter';

@Component({
  selector: 'app-save-skill-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './save-skill-form.component.html',
  styleUrl: './save-skill-form.component.css'
})
export class SaveSkillFormComponent implements IFormEmitter<SaveSkillFormSubmitArgs> {
  public skillForm = new FormGroup({
    skill_name_control: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    skill_expertise_control: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(10)
    ]),
    skill_type: new FormControl('programming_languge', [
      Validators.required
    ]),
  });

  @Output("formSubmitted") formSubmitted = new EventEmitter<SaveSkillFormSubmitArgs>();

  public onSubmit() {
    this.skillForm.get('skill_name_control')?.markAsDirty()
    this.skillForm.get('skill_expertise_control')?.markAsDirty()
    this.skillForm.get('skill_type')?.markAsDirty()
    this.skillForm.updateValueAndValidity()
    if(this.skillForm.valid) {
      this.formSubmitted.emit({
        skillName: this.skillForm.get('skill_name_control')?.value || "",
        skillExperise: this.skillForm.get('skill_expertise_control')?.value || 1,
        skillType: this.skillForm.get('skill_type')?.value || "programming_languge"
      })
    } else {
      alert("One or more fields aren't valid")
    }
  }
}

export class SaveSkillFormSubmitArgs {
  public skillName!: string;
  public skillType!: string;
  public skillExperise!: number
}
