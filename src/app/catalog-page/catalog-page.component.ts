import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FreelancersList, FreelancersListService} from './services/freelancers-list.service';



@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  freelancerList: FreelancersList;

  constructor(private freelancersListService: FreelancersListService) { }

  ngOnInit() {
    // this.getCategoryData();
  }

  // getCategoryData() {
  //   this.freelancersListService.getCategoryData('2')
  //     .subscribe(freelancerList => {
  //       console.log("freelancerList", freelancerList);
  //       this.freelancerList = freelancerList;
  //     });
  // }

}
