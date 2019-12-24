import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(
    private http: HttpClient
  ) { }

  uploadFiles(files) {
    return this.http.post('/loadAva', files);
  }

  uploadDiplomaPhotos(files) {
    return this.http.post('/loadDiplomaFiles', files);
  }

  uploadAdditionalDiplomaPhotos(files) {
    return this.http.post('/loadAdditionalDiplomaFiles', files);
  }

  public getServiceData() {
    return this.http.get('/getUserSettings');
  }

  deleteFile(id) {
    return this.http.post('/deleteDiplomaFiles', id);
  }

  public updateService( formData){
    console.log('update', formData);
    return this.http.post<any>('/updateUserSettings', formData);
  }

  public updateUserNotifications( formData){
    console.log('updateNotifications', formData);
    return this.http.post<any>('/userNotifications', formData);
  }

  public updateUserSecurityAccess( formData){
    console.log('updateUserSecurityAccess', formData);
    return this.http.post<any>('/updateUserSecurityAccess', formData);
  }

}
