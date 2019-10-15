import { Component, OnInit } from '@angular/core';
import { FreelancersList, FreelancersListService } from '../services/freelancers-list.service';

@Component({
  selector: 'app-subcategorie',
  templateUrl: './subcategorie.component.html',
  styleUrls: ['./subcategorie.component.scss']
})
export class SubcategorieComponent implements OnInit {

  freelancerList: FreelancersList;

  constructor(private freelancersListService: FreelancersListService) { }

  ngOnInit() {
    console.log("alert");
    this.getCategoryData();
  }

  getCategoryData(){
    this.freelancerList.getCategoryData()
      .subscribe(freelancerList => {
        console.log('freelancerList', freelancerList);
        this.freelancerList = freelancerList;
      });
  }

}
