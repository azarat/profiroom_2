import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface OffersListInterface {
  getSubcategoryFreelancers: any;

  category_id: number;
  comments_count?: number;
  description?: string;
  id?: number;
  minprice: number;
  name?: string;
  rating?: number;
  sub_category_id: number;
  user?: [{
    avatar?: string;
    id?: number;
    name?: string;
    rank_id: number;
    surname?: string;
  }];
  liked?: boolean;
}
