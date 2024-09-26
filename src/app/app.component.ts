import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconOpenNewWindowComponent } from './component/icons/action/icon-open-new-window/icon-open-new-window.component';
import { IconGitHubComponent } from './component/icons/social/icon-git-hub/icon-git-hub.component';
import { IconXComponent } from './component/icons/social/icon-x/icon-x.component';
import { IconYouTubeComponent } from './component/icons/social/icon-you-tube/icon-you-tube.component';
import { HeaderComponent } from './component/global/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconOpenNewWindowComponent, IconGitHubComponent, IconXComponent, IconYouTubeComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-admin';
}
