import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileLoaderService {


  constructor(
    private http: HttpClient,
  ) {

  }

  public uploadFiles(filesData) {
    return this.http.post('/sendFile', filesData);
  }

}
