import {
  trigger,
  animate,
  transition,
  style,
  state
} from '@angular/animations';

export const chartGrowAnimation = trigger('chartGrowAnimation',
  [
    state('in',
    style({ height: '0px'}),
    { params: { inHeight: '0px'}}
  ),
    state('out',
      style({ height: '{{ outHeight }}%'}),
      { params: { outHeight: '*'}}
    ),
    transition('* <=> *', animate('{{ time }} 0.2s'))
  ]
);
