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

  newEducationId() {
    return this.http.post('/newEducation', '');
  }
  deleteEducatioon(id) {
    return this.http.post('/deleteEducation', id);
  }

  uploadAdditionalDiplomaPhotos(files) {
    return this.http.post('/loadAdditionalDiplomaFiles', files);
  }

  newAdditioanlEducationId() {
    return this.http.post('/newEducation', '');
  }

  public getServiceData() {
    return this.http.get('/getUserSettings');
  }

  deleteFile(id) {
    return this.http.post('/deleteDiplomaFiles', id);
  }

  public updateService( formData) {
    return this.http.post<any>('/updateUserSettings', formData);
  }

  public updateUserNotifications( formData) {
    return this.http.post<any>('/userNotifications', formData);
  }

  public updateUserPassAccess( formData) {
    return this.http.post<any>('/password/updatePass', formData);
  }

  public updateUserMailAccess( formData) {
    return this.http.post<any>('/updateUserEmail', formData);
  }

}
