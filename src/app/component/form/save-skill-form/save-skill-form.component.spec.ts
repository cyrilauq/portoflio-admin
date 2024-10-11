import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSkillFormComponent } from './save-skill-form.component';

describe('SaveSkillFormComponent', () => {
  let component: SaveSkillFormComponent;
  let fixture: ComponentFixture<SaveSkillFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveSkillFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveSkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
