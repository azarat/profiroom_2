import { Component, OnInit, Input } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @Input() pageName: string;

  routeMainPage: any = this.localize.translateRoute('');
  constructor(
    private localize: LocalizeRouterService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  routeToMain() {
    this.router.navigate([this.routeMainPage]);
  }

}
