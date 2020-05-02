import { Injectable } from '@angular/core';
import { UpdateModel } from '../models/update.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {
  updates:UpdateModel[];
  constructor(private http: HttpClient) { }


  getUpdates(){
    console.log("m here");
    return this.http.get('./assets/updatedInfo.json');
  }
}
