import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddProjectComponent } from './form-add-project.component';

describe('FormAddProjectComponent', () => {
  let component: FormAddProjectComponent;
  let fixture: ComponentFixture<FormAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
