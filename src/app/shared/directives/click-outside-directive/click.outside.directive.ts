// import {NgModule, Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

// @Directive({
//     // tslint:disable-next-line: directive-selector
//     selector: '[clickOutside]'
// })
// export class ClickOutsideDirective {
//     // tslint:disable-next-line: variable-name
//     constructor(private _elementRef: ElementRef) {
//     }

//     @Output()
//     public clickOutside = new EventEmitter<MouseEvent>();

//     @HostListener('document:click', ['$event.target'])

//     public onClick(target) {
//       const clickedInside = this._elementRef.nativeElement.contains(target);
//       if (!clickedInside) {
//         this.clickOutside.emit();
//       }
//     }
// }
