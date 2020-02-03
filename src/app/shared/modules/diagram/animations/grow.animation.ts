import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  style,
  state,
  transition,
  trigger
} from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    state('*',
      style({ height: '{{pageMarginValue}}%' }),
      { params: { pageMarginValue: 0 } }),
    transition('*=>*', animate('0.6s ease')),
  ])
]);

