import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconGitHubComponent } from './icon-git-hub.component';

describe('IconGitHubComponent', () => {
  let component: IconGitHubComponent;
  let fixture: ComponentFixture<IconGitHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconGitHubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconGitHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
