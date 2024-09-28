import { Component, OnInit} from '@angular/core';
import { FormAddProjectComponent } from '../../component/form/form-add-project/form-add-project.component';
import ProjectService from '../../core/services/projectService';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormAddProjectComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
  count = 0
  
  constructor(private myService: ProjectService) {}

  ngOnInit(): void {
    this.myService.getProjects().subscribe({
      next: (projects) => {
        this.count = projects.length
      },
      error: (err) => alert(err)
    })
  }
}
