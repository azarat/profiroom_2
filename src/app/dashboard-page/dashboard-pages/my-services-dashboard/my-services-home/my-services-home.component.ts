import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-my-services-home',
  templateUrl: './my-services-home.component.html',
  styleUrls: ['./my-services-home.component.scss']
})
export class MyServicesHomeComponent implements OnInit {

  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
  ) { }

  ngOnInit() {
  }
  createNewService() {
    const translatedPath: any = this.localize.translateRoute('/dashboard/my-services/create');
    this.router.navigate([translatedPath]);
  }
}
