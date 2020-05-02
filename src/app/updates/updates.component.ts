import { Component, OnInit } from '@angular/core';
import { UpdatesService } from '../services/updates.service';
import { UpdateModel } from '../models/update.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
  providers:[DatePipe]
})
export class UpdatesComponent implements OnInit {
 updatedInfo:UpdateModel[];
 isAdmin:boolean=false;
 updateForm: FormGroup;
 
  constructor(private _updateService:UpdatesService,private formBuilder: FormBuilder,private datePipe:DatePipe) {
    this.updatedInfo=[];
    var isLoggedIn=localStorage.getItem("loggedAsAdmin");
    if(isLoggedIn=="true"){
      this.isAdmin=true
    }
    var updates=localStorage.getItem("PostedUpdates");
    if(updates!=undefined)
    {
      this.updatedInfo=JSON.parse(updates);
    }
   }

  ngOnInit(): void {
    this.createUpdateForm();
    if(this.updatedInfo.length==0)
    {
    this.getUpdatedInfoData();
    }
  }

  createUpdateForm(): void {
    this.updateForm = this.formBuilder.group({
      summary: new FormControl("", [Validators.required]),
      title:new FormControl("",[Validators.required]),
      description:new FormControl("",[Validators.required])
    });
  }

  getUpdatedInfoData() {
    this._updateService.getUpdates().subscribe((response:UpdateModel[]) => {
       this.updatedInfo=response;
       localStorage.setItem("PostedUpdates",JSON.stringify(this.updatedInfo));
    })
  }

  addUpdate(){
    if(this.updateForm.valid){
    let postedInfo = this.updateForm.controls['summary'].value;
    let title = this.updateForm.controls['title'].value;
    let description = this.updateForm.controls['description'].value;
    var maxId=Math.max(...this.updatedInfo.map(u=>u.id));
    this.updatedInfo.push({
       id:maxId+1,
       postedBy:"Admin",
       postedOn:this.datePipe.transform(new Date(),"dd/MM/yyyy"),
       postedInfo:postedInfo,
      title:title,
      description:description
    } 
    )
    localStorage.setItem("PostedUpdates",JSON.stringify(this.updatedInfo));
  }
  this.updateForm.reset();
  }

  removeUpdate(id:number){
    if(this.updatedInfo.some(u=>u.id==id)){
    this.updatedInfo.splice(this.updatedInfo.findIndex(item => item.id === id), 1);
    localStorage.setItem("PostedUpdates",JSON.stringify(this.updatedInfo));
    }
  }

  updateExistingInfo(id:number,postedInfo:string){
    if(this.updatedInfo.some(u=>u.id==id)){
        var thisInfo=this.updatedInfo.find(x=>x.id==id);
        thisInfo.postedInfo=postedInfo;
        thisInfo.postedBy="Admin";
        thisInfo.postedOn=this.datePipe.transform(new Date(),"MM/dd/yyyy");
      }
  }

}
