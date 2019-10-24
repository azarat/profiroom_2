import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface OffersListInterface {
  getSubcategoryFreelancers: any;
  avaible_gigs?: number;
  gigs?: [];
  descroption?: string;
  comments_count?: number;
  rating?: number;
  min_price?: number;
  liked?: boolean;
  level?: string;
  name?: string;
  surname?: string;
  ava?: string;
  data: [];
}
