import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  fps = '0';
  @HostBinding('style') style = {
    display: 'block',
    width: '1920px',
    height: '1080px',
    backgroundColor: 'white',
    color: 'black'
  }

  private animation: Animation | undefined;
  private animationClass = 'horizontal-scroll';
  private elementCount = 10;
  private frame = 0;
  private startTime = Date.now();
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

  startKeyFrameAnimation(element: HTMLElement): void {
    this.initElements(element);
    this.renderer.addClass(element, this.animationClass);
  }

  startElementAnimateAnimation(element: HTMLElement) {
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

  ngAfterViewInit(): void {
    this.tick();
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

  private tick() {
    const time = Date.now();
    this.frame++;
    if (time - this.startTime > 1000) {
      this.fps = (this.frame / ((time - this.startTime) / 1000)).toFixed(1);
      this.startTime = time;
      this.frame = 0;
    }
    window.requestAnimationFrame(this.tick.bind(this));
  }
}
