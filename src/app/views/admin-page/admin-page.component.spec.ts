import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageComponent } from './admin-page.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { POJECT_SERVICE_TOKEN } from '../../list-token';
import Project from '../../core/models/project';
import ProjectService from '../../core/services/projectService';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminPageComponent, 
      ],
      providers: [
        { 
          provide: ProjectService, 
          useValue: {
            getProjects(): Observable<Project[]> {
              return of([])
            }
          } 
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
