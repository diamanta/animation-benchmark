import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  fps = '00.0';
  @HostBinding('style') style = {
    display: 'block',
    width: '1920px',
    height: '1080px',
    backgroundColor: 'white',
    color: 'black'
  }
  isWebGL = false;
  private animation: Animation | undefined;
  private animationClass = 'horizontal-scroll';
  private elementCount = 10;
  private frame = 0;
  private startTime = Date.now();
  @ViewChild('row') private row: ElementRef<HTMLDivElement> | undefined;

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.row) {
      switch (event.keyCode) {
        case 49:
          this.startElementAnimateAnimation(this.row.nativeElement);
          break;
        case 50:
          this.startKeyFrameAnimation(this.row.nativeElement);
          break;
        case 51:
          this.startWebGLAnimation();
          break;
        default:
          break;
      }
    }
  }

  startKeyFrameAnimation(element: HTMLElement): void {
    this.initElements(element);
    this.renderer.addClass(element.firstElementChild, this.animationClass);
  }

  startElementAnimateAnimation(element: HTMLElement) {
    this.initElements(element);
    this.animation = element.firstElementChild?.animate([
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

  startWebGLAnimation(): void {
    if (this.row) {
      this.row.nativeElement.innerHTML = '';
    }
    this.isWebGL = true;
  }

  ngAfterViewInit(): void {
    this.tick();
  }

  private initElements(container: HTMLElement): void {
    this.animation?.cancel();
    this.isWebGL = false;
    this.renderer.removeClass(container.firstElementChild, this.animationClass)
    if (container.firstElementChild) {
      container.firstElementChild.innerHTML = '';
    }
    for (let i = 0; i < this.elementCount; i++) {
      const div = document.createElement('div');
      div.classList.add('box');
      this.renderer.appendChild(container.firstElementChild, div);
    }

    this.renderer.appendChild(this.elementRef.nativeElement, container.cloneNode(true))
  }
  private tick() {
    const time = Date.now();
    this.frame++;
    if (time - this.startTime > 1000) {
      this.fps = (this.frame / ((time - this.startTime) / 1000)).toFixed(1).padStart(4, '0');
      this.startTime = time;
      this.frame = 0;
    }
    window.requestAnimationFrame(this.tick.bind(this));
  }

}
