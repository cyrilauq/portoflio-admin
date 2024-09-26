import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAngularComponent } from './icon-angular.component';

describe('IconAngularComponent', () => {
  let component: IconAngularComponent;
  let fixture: ComponentFixture<IconAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconAngularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
