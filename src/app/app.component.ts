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

  constructor(private renderer: Renderer2) {
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.container) {
      switch (event.keyCode) {
        case 49:
          this.startElementAnimateAnimation(this.container.nativeElement);
          break;
        case 50:
          this.startKeyFrameAnimation(this.container.nativeElement);
          break;
        case 51:
          break;
        default:
          break;
      }
    }
  }

  private initElements(container: HTMLElement): void {
    container.innerHTML = '';
    for (let i = 0; i < this.elementCount; i++) {
      const div = document.createElement('div');
      div.classList.add('box');
      this.renderer.appendChild(this.container?.nativeElement, div);
    }
  }

  private startKeyFrameAnimation(element: HTMLElement): void {
    this.initElements(element);
    this.renderer.addClass(element, 'horizontal-scroll');
  }

  private startElementAnimateAnimation(element: HTMLElement) {
    this.initElements(element);
    element.animate([
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
}
