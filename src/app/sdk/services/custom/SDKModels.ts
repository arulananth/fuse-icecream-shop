/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Email } from '../../models/Email';
import { UploadedImage } from '../../models/UploadedImage';
import { ProductOption } from '../../models/ProductOption';
import { ProductAddition } from '../../models/ProductAddition';
import { Product } from '../../models/Product';
import { ProductCategory } from '../../models/ProductCategory';
import { AccessLog } from '../../models/AccessLog';
import { PaypalPayment } from '../../models/PaypalPayment';
import { Order } from '../../models/Order';
import { CustomUser } from '../../models/CustomUser';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Email: Email,
    UploadedImage: UploadedImage,
    ProductOption: ProductOption,
    ProductAddition: ProductAddition,
    Product: Product,
    ProductCategory: ProductCategory,
    AccessLog: AccessLog,
    PaypalPayment: PaypalPayment,
    Order: Order,
    CustomUser: CustomUser,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
