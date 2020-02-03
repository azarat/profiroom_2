import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarDateFormatter
} from 'angular-calendar';
import { CustomDateFormatter } from './providers/custtom-week-day-formatter.provider';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Input() userFinance;

  locale = 'uk';

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  // modalData: {
  //   action: string;
  //   event: CalendarEvent;
  //   cssClass: string;
  // };

  public events: CalendarEvent[];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal) {

  }
  ngOnInit() {
    this.events = this.transformFinanceInputs()
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  transformFinanceInputs() {
    const eventsArr: any[] = [];

    this.userFinance.forEach(element => {
      let event: string;
      let type = '';
      if (element.income === 1) {
        event = 'input';
      } else {
        event = 'output';
        type = '- ';
      }
      eventsArr.push({ title: type + element.amount, start: new Date(element.created_at), cssClass: event });
      return eventsArr;
    });
    return eventsArr;
  }

}
