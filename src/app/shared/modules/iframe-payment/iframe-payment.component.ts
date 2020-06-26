import { Component, OnInit, Input, PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-iframe-payment',
  templateUrl: './iframe-payment.component.html',
  styleUrls: ['./iframe-payment.component.scss']
})
export class IframePaymentComponent implements OnInit  {

  @Input() iframeUrl: string;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

}
