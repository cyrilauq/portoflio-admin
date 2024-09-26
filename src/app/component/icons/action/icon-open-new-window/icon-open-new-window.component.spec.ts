import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconOpenNewWindowComponent } from './icon-open-new-window.component';

describe('IconOpenNewWindowComponent', () => {
  let component: IconOpenNewWindowComponent;
  let fixture: ComponentFixture<IconOpenNewWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconOpenNewWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconOpenNewWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
