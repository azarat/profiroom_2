import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardSettingsService {

  constructor(
    private http: HttpClient
  ) { }

  uploadFiles(files){
    return this.http.post('/loadAva', files);
  }
}
