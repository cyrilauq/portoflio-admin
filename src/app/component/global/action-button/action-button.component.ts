import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css'
})
export class ActionButtonComponent {
  @Output() onClick = new EventEmitter<MouseEvent>()

  public onButtonClicked(event: MouseEvent) {
    console.log("Button clicked");
  }
}
