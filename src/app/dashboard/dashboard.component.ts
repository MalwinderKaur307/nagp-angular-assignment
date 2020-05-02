import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DashboardService } from '../services/dashboard.service';
import { DashboardStatewiseDataModel } from '../models/dashboard-statewise-data.model';
import { StateDataModel } from '../models/state-data.model';
import { DistrictDataModel } from '../models/district-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cols: any[];
  frozenCols: any[];
  data: any;
  options: any;
  failures: any;
  failureDurations: any;
  failureOptions: any;
  totalRecords: number = 1;
  loading: boolean = false;
  states: SelectItem[] = [];
  selectedState: string = "Total";
  stateData: StateDataModel;
  dashboardData: StateDataModel[]=[];
  districtData: any[] = [{ active: 1, deaths: 1, confirmed: 1, recovered: 1, district: "District1" }];
  pageSize: number = 4;

  constructor(private dashboardService: DashboardService) {
    this.failures = {
      labels: ['Reported', 'Active', 'Recovered', 'Deceased'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81]
        }
      ]
    }
    this.getDashboardData();
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'active', header: 'Active' },
      { field: 'deaths', header: 'Deaths' },
      { field: 'confirmed', header: 'Confirmed' },
      { field: 'recovered', header: 'Recovered' },
    ];

    this.frozenCols = [{ field: 'district', header: 'District' }];

  }

  getDashboardData() {
    this.states = [];
    this.dashboardService.getDashboardStateData().subscribe((response: DashboardStatewiseDataModel) => {
      console.log(response);
      this.dashboardData = response.statewise;
      this.states = this.dashboardData.map(y => { return { label: y.state, value: y.state } });
      console.log(this.states);
      var selectedData = this.dashboardData.filter(d => d.state == this.selectedState).pop();
      if(selectedData==undefined){
        return;
      }
      this.failures = {
        labels: ['Reported', 'Active', 'Recovered', 'Deceased'],
        datasets: [
          {
            label: selectedData.state,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [selectedData.confirmed, selectedData.active, selectedData.recovered, selectedData.deaths]
          }
        ]
      }
      this.districtData = [];
      this.totalRecords=0;
      this.dashboardService.getDashboarDistrictdData().subscribe((res) => {
        if(res!=undefined){
        if (selectedData.state == "Total") {
          Object.keys(res).forEach((key, index) => {
            var stateDistricts = res[key]["districtData"];
            this.totalRecords=this.totalRecords+ Object.keys(stateDistricts).length;
            Object.keys(stateDistricts).forEach((key, index) => {
              var distData = stateDistricts[key];
              this.districtData.push({ active: distData.active, deaths: distData.deceased, recovered: distData.recovered, confirmed: distData.confirmed, district: key })
            });
          });
        }
        else {
          var stateDistricts = res[selectedData.state]["districtData"];
          this.totalRecords=Object.keys(stateDistricts).length;
          Object.keys(stateDistricts).forEach((key, index) => {
            var distData = stateDistricts[key];
            this.districtData.push({ active: distData.active, deaths: distData.deceased, recovered: distData.recovered, confirmed: distData.confirmed, district: key })
          });
        }

      }
    })
    })
  }

}
