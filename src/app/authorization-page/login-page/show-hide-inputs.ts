import { Directive, HostBinding, OnChanges, Input } from '@angular/core';


// tslint:disable-next-line: directive-selector
@Directive({ selector: '[showHideInput]'
})
export class ShowHideInputDirective implements OnChanges {
  @Input() public showHideInput = false;
  @HostBinding() type = 'password';

  constructor() {}

  public ngOnChanges(changes) {
    if (!changes.showHideInput) {
      return;
    }

    this._changeType(this.showHideInput ? 'text' : 'password');
  }

  private _changeType(type: string) {
    this.type = type;
  }
}
