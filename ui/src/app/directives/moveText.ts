import { Directive, ElementRef, HostListener } from '@angular/core';

const MOVE_MARGIN = 10;

@Directive({
  selector: '[appMoveText]',
})
export class MoveTextDirective {
  private interval: NodeJS.Timeout;
  private movableElement: HTMLElement;
  private scrollsForward = true;

  @HostListener('mouseenter') onMouseEnter() {
    this.move();
  }

  @HostListener('mouseleave') onMouseLeave() {
    clearInterval(this.interval);
    this.movableElement.style.transform = `translateX(0px)`;
  }

  constructor(private el: ElementRef) {}

  private move() {
    const container = this.el.nativeElement.querySelectorAll('.overflow-hidden')[0];
    const containerWidth = container.offsetWidth;

    this.movableElement = this.el.nativeElement.querySelectorAll('.info')[0];
    const movableWidth = this.movableElement.scrollWidth;

    if (movableWidth <= containerWidth) {
      return;
    }

    let pos = 0;
    this.interval = setInterval(() => {
      this.scrollsForward ? pos++ : pos--;

      if (containerWidth + pos === movableWidth + MOVE_MARGIN) {
        this.scrollsForward = false;
      } else if (pos === -MOVE_MARGIN) {
        this.scrollsForward = true;
      }

      this.movableElement.style.transform = `translateX(${-pos}px)`;
    }, 50);
  }
}
