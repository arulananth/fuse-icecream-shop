import { Component, OnInit } from '@angular/core';
import {distributionInDay , distributionInWeek } from '../../../../_models/constants/data';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector   : 'user-report-dashboard',
    templateUrl: './user-reports-dashboard.component.html',
    styleUrls  : ['./user-reports-dashboard.component.scss']
})
export class UserReportDashboard implements OnInit
{
  single: any[];
  multi: any[];

  view: any[] = [1300, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;

  reportForm:FormGroup;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(
    private _formBuilder:FormBuilder
  ){
    Object.assign(this, {distributionInDay, distributionInWeek}); 
  }
  
  ngOnInit(){
    this.initializeForm();
  }

  initializeForm(){
    this.reportForm = this._formBuilder.group({
      startDate : '' ,
      endDate : '' ,
    });
  }

  onSelect(event) {
    console.log(event);
  }
}
