import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { FormAddProjectComponent } from './form-add-project.component';
import { By } from '@angular/platform-browser';
import Project from '../../../core/models/project';

describe('FormAddProjectComponent', () => {
  let component: FormAddProjectComponent;
  let fixture: ComponentFixture<FormAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddProjectComponent],
      providers: [{provide: ComponentFixtureAutoDetect, useValue: true}],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddProjectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when submit clicked should emit event "formSubmitted"', () => {
    let submittedProject: Project | undefined
    component.formSubmitted.subscribe(args => submittedProject = args.project)
    const element = fixture.debugElement
    fixture.detectChanges()
    let nextBtn = element.query(By.css('.next-btn'))
    component.title_control.setValue('test value')
    component.description_control.setValue('test valuetest valuetest valuetest value')
    component.live_link_control.setValue('test value')
    nextBtn.nativeElement.click()
    nextBtn = element.query(By.css('.next-btn'))
    nextBtn.nativeElement.click()
    component.technologie_control.setValue('test value')
    component.link_src_control.setValue('test value')
    component.link_title_control.setValue('test value')
    nextBtn = element.query(By.css('.next-btn'))
    nextBtn.nativeElement.click()
    fixture.detectChanges()
    const submitBtn = element.query(By.css('.submit-btn'))
    submitBtn.nativeElement.click()
    

    expect(submittedProject).not.toBeUndefined()
  })
});

const setInputValue = (inputName: string, newValue: string, fixture: ComponentFixture<FormAddProjectComponent>) => {
  const element = fixture.debugElement.query(By.css(`input[name="${inputName}"]`)).nativeElement;
  element.value = newValue
  element.dispatchEvent(new Event('input'), new Event('blur'))
}
