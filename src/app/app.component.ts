import { Component, ElementRef, HostListener, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private elementCount = 100;

  @ViewChild('container') private container: ElementRef<HTMLDivElement> | undefined;

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.style.display = 'flex';
    this.elementRef.nativeElement.style.flexWrap = 'wrap';
  }


  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent){
    switch (event.keyCode) {
      case 49:
        this.elementRef.nativeElement.innerHTML = '';
        for (let i = 0; i< this.elementCount; i++) {
          const div = document.createElement('div');
          div.classList.add('box');
          this.elementRef.nativeElement.appendChild(div);
        }
        break;
    }
  }
}
