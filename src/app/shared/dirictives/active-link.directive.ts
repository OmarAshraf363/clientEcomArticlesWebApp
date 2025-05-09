import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appActiveLink]'
})
export class ActiveLinkDirective {

   constructor(private ele: ElementRef, private render: Renderer2) {}
  
    @HostListener('click') onCLick() {
      const realEle = this.ele.nativeElement as HTMLElement;
      console.log("Iam in dirictive")
      if(realEle.classList.contains('home')&&realEle.classList.contains('active')){
        return;
      }
      if(realEle.classList.contains('home')&&!realEle.classList.contains('active')){
        document.querySelector('.saved')?.classList.remove('active')

        this.render.addClass(this.ele.nativeElement, 'active');
        return;
      }
      if(realEle.classList.contains('saved')&&!realEle.classList.contains('active')){
        document.querySelector('.home')?.classList.remove('active')
        
        this.render.addClass(this.ele.nativeElement, 'active');

        return;
      }

      // if (realEle.classList.contains('active')) {
      //   this.render.removeClass(this.ele.nativeElement, 'active');
      // } else {
      //   this.render.addClass(this.ele.nativeElement, 'active');
      // }
    }

}
