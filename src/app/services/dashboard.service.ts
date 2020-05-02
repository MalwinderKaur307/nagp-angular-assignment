import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardStateData(){
    return this.http.get("https://api.covid19india.org/data.json"); 
  }

  getDashboarDistrictdData(){
    return this.http.get("https://api.covid19india.org/state_district_wise.json"); 
  }
}
