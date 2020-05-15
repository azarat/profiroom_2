import {
  Component,
  ViewChild,
  TemplateRef,
  Input,
  OnInit
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarView,
  CalendarDateFormatter
} from 'angular-calendar';
import { CustomDateFormatter } from './providers/custtom-week-day-formatter.provider';
import { el } from 'date-fns/locale';

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
    this.events = this.transformFinanceInputs();
    console.log(this.userFinance);
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
      if (element.trnsactonType === ('hold' || 'dealCanceled')) {
        return;
      }

      if (element.income === 1 ) {
        event = 'input';
      } else {
        event = 'output';
        // type = '- ';
      }

      if (eventsArr.length !== 0) {
        const item = { title: element.amount, start: new Date(element.created_at), cssClass: event };
        eventsArr.forEach(el => {
          if (el.start.getDate() === item.start.getDate()) {
            if (el.cssClass === item.cssClass) {
              el.title = Number(el.title) + Number(item.title);

            } else {
              eventsArr.push({ title: element.amount, start: new Date(element.created_at), cssClass: event });
            }

          } else {
            eventsArr.push({ title: element.amount, start: new Date(element.created_at), cssClass: event });
          }
        });
      } else if(eventsArr.length === 0) {
        const item = { title: element.amount, start: new Date(element.created_at), cssClass: event };
        eventsArr.push({ title: element.amount, start: new Date(element.created_at), cssClass: event });
      }




      // return eventsArr;
    });

    return eventsArr;
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    // console.log( event);
  }

}
