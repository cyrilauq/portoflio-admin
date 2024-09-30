import {
    Directive,
    Renderer2,
    ElementRef,
    OnInit,
    OnDestroy,
    Output,
    EventEmitter
  } from '@angular/core';
  
  @Directive({
    selector: '[click.prevent]',
    standalone: true
  })
  export class PreventDefaultDirective implements OnInit, OnDestroy {
    @Output('click.prevent') clicked = new EventEmitter<Event>();
  
    private unlisten: Function | undefined;
  
    constructor(private renderer: Renderer2, private el: ElementRef) {}
  
    ngOnInit() {
      this.unlisten = this.renderer.listen(
        this.el.nativeElement,
        'click',
        (event: Event) => {
          event.preventDefault();
          this.clicked.emit(event);
        }
      );
    }
  
    ngOnDestroy() {
      if (this.unlisten) {
        this.unlisten();
      }
    }
  }