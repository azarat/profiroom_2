import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  public onloadUserModelCopy$ = new Subject();
  constructor(
    private http: HttpClient
  ) { }
  // ------ upload avatar -------
  uploadFiles(files) {
    return this.http.post('/loadAva', files);
  }

  // ------ education -------
  newEducationId() {
    return this.http.post('/newEducation', '');
  }
  deleteEducationID(id) {
    console.log('delete');
    return this.http.post('/deleteEducation', id);
  }
  uploadDiplomaPhotos(files) {
    return this.http.post('/loadDiplomaFiles', files);
  }
  deleteFile(imgName) {
    return this.http.post('/deleteDiplomaFiles', imgName);
  }



  // ------ Additional education -------
  newAdditioanlEducationId() {
    return this.http.post('/newAdditionalEducation', '');
  }
  deleteAdditioanlEducationID(id) {
    return this.http.post('/deleteAdditionalEducation', id);
  }
  uploadAdditionalDiplomaPhotos(files) {
    return this.http.post('/loadAdditionalDiplomaFiles', files);
  }



  public getServiceData() {
    return this.http.get('/getUserSettings');
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
