import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appActiveLink]',
})
export class ActiveLinkDirective {
  constructor(private ele: ElementRef, private render: Renderer2) {}

  @HostListener('click') onCLick() {
    const realEle = this.ele.nativeElement as HTMLElement;

    if (realEle.classList.contains('active')) {
      this.render.removeClass(this.ele.nativeElement, 'active');
    } else {
      this.render.addClass(this.ele.nativeElement, 'active');
    }
  }
}
