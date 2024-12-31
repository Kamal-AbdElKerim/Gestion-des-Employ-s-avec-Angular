import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Change the cursor to a custom one on mouse enter
  @HostListener('mouseenter') onMouseEnter() {
    this.setCursor('help');
  }

  // Reset the cursor on mouse leave
  @HostListener('mouseleave') onMouseLeave() {
    this.setCursor('auto'); // Default cursor
  }

  private setCursor(cursor: string) {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', cursor);
  }
}
