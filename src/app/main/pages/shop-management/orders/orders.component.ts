import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import * as _moment from 'moment';
import { LoginService, OrderService, UserService } from '@/_services';
import {Orders, orderStatus, orderStatusObj} from '@/_models';
import { OrderApi } from '@/sdk/services/index';
import {DialogsService} from '@/main/components/confirm-dialog';
import { ToastaConfig, ToastaService,ToastData,ToastOptions } from 'ngx-toasta';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';
// const moment = _rollupMoment || _moment;
const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface deliveryTypes {
  value: number,
  viewValue: string
}
export interface OrdersData {
  id: number,
  scheduleDelivery: string;
  payment: String;
  status: String;
  user: String;
}

// const ELEMENT_DATA: OrdersData[] = [
//   { id: 1, scheduleDelivery: '2 Hours', payment: 'n.a', status: 'PENDING', user: 'JOHN' },
//   { id: 2, scheduleDelivery: '2 Hours', payment: 'n.a', status: 'PENDING', user: 'HARRY' },
//   { id: 3, scheduleDelivery: '2 Minutes', payment: 'PAID', status: 'APPROVED', user: 'PETER' },
//   { id: 4, scheduleDelivery: '3 Hours 20 Minutes', payment: 'n.a', status: 'PENDING', user: 'JEZ' },
//   { id: 5, scheduleDelivery: '5 Hours', payment: 'n.a', status: 'REJECTED', user: 'WINSTON' },
//   { id: 6, scheduleDelivery: '6 Hours', payment: 'n.a', status: 'PENDING', user: 'SMITH' },
//   { id: 7, scheduleDelivery: '5 Hours', payment: 'n.a', status: 'REJECTED', user: 'WINSTON' },
//   { id: 8, scheduleDelivery: '6 Hours', payment: 'n.a', status: 'PENDING', user: 'SMITH' }
// ];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}, 

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class OrderManagementComponent implements OnInit {
  displayedColumns: string[] = ['scheduleDelivery', 'payment', 'status', 'user', 'actions'];
  ELEMENT_DATA = [];
  original_DATA = [];
  users = [];
  dataSource = null;
  dataLength = null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  now = moment(new Date());
  orderForm:FormGroup = null;
  orderStatus= orderStatus;
  orderStatusObj = orderStatusObj;
  deliveryTypes: deliveryTypes[] = [
    {value: 0, viewValue: 'PICKUP'},
    {value: 1, viewValue: 'DELIVERY'}
  ];
  toastOptions: ToastOptions = {
    title: "",
    msg: "",
    showClose: false,
    timeout: 5000,
    theme: 'bootstrap'
  };
  pendingOrders:number;
  orderToBePicked:number;
  orderToBeDeliverd:number;
  constructor(
    private _formBuilder:FormBuilder,
    private _router: Router,
    private _loginService: LoginService,
    private _orderService: OrderService,
    private _userService: UserService,
    private _orderAPI: OrderApi,
    private dialogService: DialogsService,
    private toastaConfig:ToastaConfig,
    private toastaService:ToastaService) {
      this.toastaConfig.position = "bottom-right";
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllOrders();
  }

  private initializeForm(){
    this.orderForm = this._formBuilder.group({
      startDate : '' ,
      endDate : '' ,
      delivery:'' ,
      status:'' 
    });
  }

  onSubmit(): void { 
    let form = this.orderForm.value;
    let conditions = [];
    if(form.startDate)
      conditions.push({date: {gt: form.startDate}});
    if(form.endDate)
      conditions.push({date: {lt: form.endDate}});
    if(form.delivery)
      conditions.push({deliveryMethod: form.delivery});
    if(form.status)
      conditions.push({status: form.status});
    let where:any = {
      where: {
        and: conditions
      },
      include: "customer"
    };
    this._orderAPI.findOrders(where)
      .subscribe(orders => {
        this.toastOptions.msg = "Found your orders";
        this.toastaService.success(this.toastOptions);
        this.ELEMENT_DATA = orders;
        this.constructDataSource();
      });
  }

  setTodayDate(): void {
    this.orderForm.patchValue({
      startDate: this.now,
      endDate: this.now
    });
    window.console.log(this.orderForm.value);
  }

  getAllOrders(): void {
    let where:any = {
      where: {
        date: {gt: Date.now()}
      },
      include: "customer"
    };
    this._orderAPI.findOrders(where)
      .subscribe(orders => {
        console.log(orders);
        this.ELEMENT_DATA = orders;
        this.original_DATA = orders;
        this.constructDataSource();
      }
      , error => console.log(error));
  }

  constructDataSource(): void {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataLength = this.ELEMENT_DATA.length;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getOrderCounts();
  }

  getOrderCounts(): void {
    this.pendingOrders = this.ELEMENT_DATA.filter(el => el.status === 0).length;
    this.orderToBePicked= this.ELEMENT_DATA.filter(el => el.deliveryMethod === 0).length;
    this.orderToBeDeliverd = this.ELEMENT_DATA.filter(el => el.deliveryMethod === 1).length;
  }
  
  deleteOrders(): void {
    this.dialogService
      .confirm('Delete Order', 'Are you sure you want to do this?')
      .subscribe(res => console.log(res));
  }
}
