import { Component, ElementRef, HostBinding, HostListener, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

declare const tizen: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private animation: Animation | undefined;
  private animationClass = 'horizontal-scroll';
  private elementCount = 10;
  @ViewChild('container') private container: ElementRef<HTMLDivElement> | undefined;
  @HostBinding('style') style = {
    display: 'block',
    width: '1920px',
    height: '1080px',
    backgroundColor: 'white',
    color: 'black',
  }

  constructor(private renderer: Renderer2) {
    this.registerTizenKeys();
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

  private registerTizenKeys() {
    if ((window as any).tizen) {
      const mediaKeyCodes = [10252, 412, 417, 415, 19, 413, 427, 428, 457];
      const supportedKeys = tizen.tvinputdevice.getSupportedKeys();

      supportedKeys.forEach((key: {code: number, name: string}) => {
        if ((+key.code >= 48 && +key.code <= 57) || mediaKeyCodes.indexOf(+key.code) > -1) {
          tizen.tvinputdevice.registerKey(key.name);
        }
      });
    }
  }

  private initElements(container: HTMLElement): void {
    this.animation?.cancel();
    this.renderer.removeClass(container, this.animationClass)
    container.innerHTML = '';
    for (let i = 0; i < this.elementCount; i++) {
      const div = document.createElement('div');
      div.classList.add('box');
      this.renderer.appendChild(this.container?.nativeElement, div);
    }
  }

  private startKeyFrameAnimation(element: HTMLElement): void {
    this.initElements(element);
    this.renderer.addClass(element, this.animationClass);
  }

  private startElementAnimateAnimation(element: HTMLElement) {
    this.initElements(element);
    this.animation = element.animate([
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
