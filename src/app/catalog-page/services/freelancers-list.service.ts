import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { freelancersListInterface } from 'src/app/shared/interfaces/freelancerList.interface';

@Injectable({
  providedIn: 'root'
})
export class FreelancersListService {

  public dataList: Observable<freelancersListInterface>; // - observable
  picService: any;

  constructor(private httpClient: HttpClient) {
    // this.listData
  }

  getFreelancersList() {
    this.picService.get('http://anyurl.com').subscibe(value => {
      this.dataList = value;
  });
  }


}
