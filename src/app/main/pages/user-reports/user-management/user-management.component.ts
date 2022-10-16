import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserReport } from '../../../../_models';
import { UserService } from '../../../../_services';

@Component({
    selector   : 'user-management',
    templateUrl: './user-management.component.html',
    styleUrls  : ['./user-management.component.scss']
})
export class UserManagement implements OnInit
{
  displayedColumns: string[] = ['username','lastDate','lastOrder','totalOrders','totalAmount'];
  dataSource:MatTableDataSource<any> = null;
  private userReports:Array<UserReport> = null;
  constructor(
      private _userService:UserService
  ){

  }
  
  ngOnInit(){
    this._userService.getAllUserReports()
      .subscribe(userReports => {
        this.userReports = userReports;
        this.dataSource = new MatTableDataSource(this.userReports);
      });
  }
}
