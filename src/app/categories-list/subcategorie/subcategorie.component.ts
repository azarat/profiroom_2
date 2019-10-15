import { Component, OnInit } from '@angular/core';
import { FreelancersList, FreelancersListService } from '../services/freelancers-list.service';

@Component({
  selector: 'app-subcategorie',
  templateUrl: './subcategorie.component.html',
  styleUrls: ['./subcategorie.component.scss']
})
export class SubcategorieComponent implements OnInit {

  freelancerList: FreelancersList[] = [];
  // FreelancersListService: any;

  constructor(private freelancersListService: FreelancersListService) { }

  ngOnInit() {
    this.getList();
  }

  // getSubcategoryFreelancers() {
  //   this.freelancersListService.getSubcategoryFreelancers({})
  //   .subscribe(freelancerList => {
  //     console.log('freelancerList', freelancerList);
  //     this.freelancerList = freelancerList;
  //   });
  // }

  getList() {
    // this.freelancersListService.getCategoriesList('')
    // .subscribe(freelancerList => {
    //   console.log('freelancerList', freelancerList);
    //   this.freelancerList = freelancerList;
    // });
  }

}
