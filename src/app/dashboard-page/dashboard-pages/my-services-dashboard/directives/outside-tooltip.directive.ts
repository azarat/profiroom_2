import {Directive, ElementRef, Output, EventEmitter, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[outsideTooltip]'
})
export class OutsideTolltiDirective {

    @Input('outsideTooltip') tooltipTitle: string;
    @Input('outsideTooltipDescription') tooltipDescription: string;
    @Input() placement: string;
    private tooltip: HTMLElement;
    private delay = '500';
    private offset = 20;

    // tslint:disable-next-line: variable-name
    constructor(private el: ElementRef, 
    private renderer: Renderer2) {
    }

    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target']) onClick(event: MouseEvent, targetElement: HTMLElement): void {
        const clickedInside = this.el.nativeElement.contains(targetElement);
        if (clickedInside) {
            if(!this.tooltip) {this.show();}
            return;
        }

       
        if (!clickedInside) {
            if(this.tooltip){this.hide()}
        }
    }

    private show(){
        this.create();
        this.setPosition();
        this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
      }
      private hide(){
        this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
        window.setTimeout(() => {
          this.renderer.removeChild(document.body, this.tooltip);
          this.tooltip = null;
        }, 500);
      }
    
      private create() {
        this.tooltip = this.renderer.createElement('div');
        let title = this.renderer.createElement('p');
        let description = this.renderer.createElement('p');
    
        title.innerHTML = this.tooltipTitle;
        description.innerHTML = this.tooltipDescription;
        // this.renderer.appendChild(
        //   title,  this.renderer.createText(this.tooltipTitle)
        // ); // add title text
        // this.renderer.appendChild(
        //   description, this.renderer.createText(this.tooltipDescription)
        // ); // add description text
        
    
        this.renderer.appendChild(
          this.tooltip, title,
        ); // add title in div
        this.renderer.appendChild(
          this.tooltip, description,
        ); // add description in div
    
    
        this.renderer.appendChild(
          document.body,
          this.tooltip
        )
        
        this.renderer.addClass(this.tooltip, 'ng-tooltip-outside');
        this.renderer.addClass(this.tooltip, `ng-tooltip-outside-${this.placement}`);
    
        // delay 
        this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
      }
    
      private setPosition() {
        const hostPos = this.el.nativeElement.getBoundingClientRect();
    
        const tooltipPos = this.tooltip.getBoundingClientRect();
    
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
        let top, left;
    
        if( this.placement === 'top') {
          top = hostPos.top - tooltipPos.height - this.offset;
          left = hostPos.left + (hostPos.width - tooltipPos.width) / 2
        }
    
        if(this.placement === 'bottom') {
          top = hostPos.bottom + this.offset;
          left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }
    
        if(this.placement === 'right') {
          top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
          left = hostPos.right + this.offset;
        }
        
        this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
      }
}
