import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { orderStatus, DeliveryTypes, Orders, orderStatusObj } from '@/_models';
import { LoginService, OrderService, UserService } from '@/_services';
import { ProductManagementService, CategoryManagementService } from '@/_services';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ToastaConfig, ToastaService,ToastData,ToastOptions } from 'ngx-toasta';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { Observable } from 'rxjs';
import { OrderApi, ProductAdditionApi} from '@/sdk/services';
import { DialogsService} from '@/main/components/confirm-dialog';
import { SelectDialogsService} from '@/main/components/select-dialog';
import * as _ from 'lodash';
 
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
const ordersList = [
  { id: 1, scheduleDelivery: '2 Hours', payment: 'n.a', status: 'PENDING', user: 'JOHN' },
  { id: 2, scheduleDelivery: '2 Hours', payment: 'n.a', status: 'PENDING', user: 'HARRY' },
  { id: 3, scheduleDelivery: '2 Minutes', payment: 'PAID', status: 'APPROVED', user: 'PETER' },
  { id: 4, scheduleDelivery: '3 Hours 20 Minutes', payment: 'n.a', status: 'PENDING', user: 'JEZ' },
  { id: 5, scheduleDelivery: '5 Hours', payment: 'n.a', status: 'REJECTED', user: 'WINSTON' },
  { id: 6, scheduleDelivery: '6 Hours', payment: 'n.a', status: 'PENDING', user: 'SMITH' }
];

export interface Option {
  name: string;
}

export interface Addition {
  id: number,
  name: string;
}

export interface Product {
  options: Option[],
  additions: Addition[]
}
export interface Products {
  categoryName: string,
  productName: string,
  additionItems: Addition[]
}

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}, 

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ShowOrderComponent implements OnInit {
  order = null;
  accessToken = null;
  orderStatusObj = orderStatusObj;
  productItems: any = [];
  orderStatus = orderStatus;
  deliveryTypes: DeliveryTypes[] = [
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
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _orderService: OrderService,
    private _loginService: LoginService,
    private _userService: UserService,
    private productManagementService: ProductManagementService,
    private categoryManagementService: CategoryManagementService,
    private _orderApi: OrderApi,
    private toastaConfig:ToastaConfig,
    private toastaService:ToastaService,
    private dialogService: DialogsService,
    private productAdditionApi: ProductAdditionApi,
    private selectDialogService: SelectDialogsService
  ) {
    this.toastaConfig.position = "bottom-right";
   }

  ngOnInit() {
    this.getOrder();
  }

  getOrder(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    const session = this._loginService.getApplication();
    this.accessToken = session.id;
    this._orderApi.getOrderById(id, {include: 'customer'})
      .subscribe(order => {
        console.log(order);
        this.order = order;
        this.order.cost = 0;
        this.constructProductItems();
      }
      , error => console.log(error));
  }

  getUser(id: number): Observable<any> {
    return this._userService.getOrderUserById(id, this.accessToken);
  }
  
  constructProductItems(): void {
    let products = this.order.productItems;
    let orderItems = [];
    products.forEach(product => {
      this.productManagementService.getProductById(product.id)
        .subscribe((productDetail) => {
          let productItem:any = {};
          productItem.id = productDetail.id;
          productItem.productName = productDetail.name;
          productItem.additionItems = [];
          this.categoryManagementService.getCategoryById(productDetail.productCategoryId)
            .subscribe(category => {
              productItem.categoryName = category.name;
            });
          product.additionItems.forEach(addition => {
            this.productAdditionApi.getAdditionById(addition.id)
            .subscribe(addition => {
              productItem.additionItems.push({name: addition.name, id: addition.id});
            });
          });
          this.productItems.push(productItem);
          console.log(productItem);
        }, 
        (error) => console.log(error));
        this.order.cost += product.cost;
    });    
  }
  goBack(): void {
    this.location.back();
  }

  updateOrder(id: number): void {
    console.log(this.order);
    this._orderApi.updateByIdOrder(id, this.order)
      .subscribe(data => {
        console.log(data);
        this.toastOptions.msg = "Product updated Successfully";
        this.toastaService.success(this.toastOptions);
      }, error => {
        this.toastOptions.msg = "Product update failed";
        this.toastaService.error(this.toastOptions);
      })
  }

  updateProduct(product: any ={}): void {
    console.log(product);
    this.selectDialogService
      .select('TODO: IN PROGRESS', [], 'TODO: IN PROGRESS')
      .subscribe(( selected: any) => {
        console.log(selected);
      });
  }

  updateAddition(selectedAddition: any ={}, product: any = {}): void {
    console.log(selectedAddition);
    let productItem = this.order.productItems.filter(item => item.id == product.id)[0];
    this.productManagementService.getAllAdditionsForProduct(product.id) 
    .subscribe(additions => {
      console.log(additions);
      this.selectDialogService
      .select('Select Your Addition', additions, 'Select ADDITION')
      .subscribe(( selected: any) => {
        if(selected) {
          console.log(selected);
          this.productAdditionApi.getAdditionById(selected)
          .subscribe(newAddition => {
            console.log(newAddition);
            let updatedAdditions = productItem.additionItems.filter(addition => addition.id != selectedAddition.id);
            updatedAdditions.push(newAddition);
            let editedProducts = _.extend({}, productItem, {'additionItems':updatedAdditions});
            this._orderApi.updateByIdProducts(this.order.id, product.id, editedProducts)
            .subscribe(res => {
              product.additionItems = updatedAdditions;
              this.toastOptions.msg = "Addition Updated Successfully";
              this.toastaService.success(this.toastOptions);
            }, err => {
              this.toastOptions.msg = "Addition UPDATE failed";
              this.toastaService.error(this.toastOptions);
            });
          })
        }
      });
    });
  }

  deleteProduct(product: any ={}): void {
    window.console.log(product);
    //let updatedAdditions = product.filter(addition => addition.id !== selectedAddition.id);
    this.dialogService
      .confirm('Delete Addition', 'Are you sure you want to do this?')
      .subscribe(okay => {
        if(okay) {
          this._orderApi.destroyByIdProducts(this.order.id, product.id)
          .subscribe(res => {
            this.productItems = this.productItems.filter(item => item.id !== product.id);
            this.toastOptions.msg = "Product deleted Successfully";
            this.toastaService.success(this.toastOptions);
          }, err => {
            this.toastOptions.msg = "Product delete failed";
            this.toastaService.error(this.toastOptions);
          });
        }
      });
  }

  deleteAddition(selectedAddition: any ={}, product: any = {}): void {
    window.console.log(selectedAddition);
    let productItem = this.order.productItems.filter(item => item.id == product.id)[0];
    let updatedAdditions = productItem.additionItems.filter(addition => addition.id != selectedAddition.id);
    this.dialogService
      .confirm('Delete Addition', 'Are you sure you want to do this?')
      .subscribe(okay => {
        if(okay) {
          let editedProducts = _.extend({}, productItem, {'additionItems':updatedAdditions});
          this._orderApi.updateByIdProducts(this.order.id, product.id, editedProducts)
          .subscribe(res => {
            product.additionItems = updatedAdditions;
            this.toastOptions.msg = "Addition deleted Successfully";
            this.toastaService.success(this.toastOptions);
          }, err => {
            this.toastOptions.msg = "Addition delete failed";
            this.toastaService.error(this.toastOptions);
          });
        }
      });
  }
}
