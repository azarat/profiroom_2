import { Component, OnInit } from '@angular/core';
import { FreelancersList, FreelancersListService } from '../services/freelancers-list.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  freelancerList: FreelancersList;

  constructor(private freelancersListService: FreelancersListService) { }

  ngOnInit() {
    // this.fetchCategoryData( "як сюди запхати id категорії яку ми вибрали" );
  }

  fetchCategoryData() {
    this.freelancersListService.getCategoryData('2')
      .subscribe(freelancerList => {
        console.log('freelancerList', freelancerList);
        this.freelancerList = freelancerList;
      });
  }

}
