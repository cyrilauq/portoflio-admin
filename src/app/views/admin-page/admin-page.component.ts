import { Component } from '@angular/core';
import { FormAddProjectComponent } from '../../component/form/form-add-project/form-add-project.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormAddProjectComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
