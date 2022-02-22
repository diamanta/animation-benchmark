import { Component, ElementRef, HostListener, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private elementCount = 10;
  @ViewChild('container') private container: ElementRef<HTMLDivElement> | undefined;

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {
  }

  private get elements(): HTMLCollection {
    return this.container?.nativeElement.children || new HTMLCollection();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.container) {
      switch (event.keyCode) {
        case 49:
          this.container.nativeElement.innerHTML = '';
          for (let i = 0; i < this.elementCount; i++) {
            const div = document.createElement('div');
            div.classList.add('box');
            this.renderer.appendChild(this.container?.nativeElement, div);
          }
          break;
        case 50:
          for (let i = 0; i < this.elements.length; i++) {
            this.elements.item(i)?.animate([
              {
                transform: 'translateX(0)',
                offset: 0
              }, {
                transform: 'translateX(500px)',
                offset: 0.5
              }, {
                transform: 'translateX(0)',
                offset: 1
              }
            ], {
              duration: 10000,
              iterations: Infinity
            })
          }
          break;
        case 51:
          break;
        default:
          break;
      }
    }
  }
}
