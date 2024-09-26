import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconYouTubeComponent } from './icon-you-tube.component';

describe('IconYouTubeComponent', () => {
  let component: IconYouTubeComponent;
  let fixture: ComponentFixture<IconYouTubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconYouTubeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconYouTubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
