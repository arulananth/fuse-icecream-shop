/* tslint:disable */
import {
  CustomUser
} from '../index';

declare var Object: any;
export interface OrderInterface {
  "date": Date;
  "deliveryMethod": number;
  "bookingDate": Date;
  "deliveryLocation"?: string;
  "contactPhone"?: string;
  "notes"?: string;
  "paymentMethod": number;
  "status": number;
  "paymentStatus": number;
  "id"?: number;
  "productItems"?: Array<any>;
  "customerId"?: number;
  products?: any[];
  customer?: CustomUser;
}

export class Order implements OrderInterface {
  "date": Date;
  "deliveryMethod": number;
  "bookingDate": Date;
  "deliveryLocation": string;
  "contactPhone": string;
  "notes": string;
  "paymentMethod": number;
  "status": number;
  "paymentStatus": number;
  "id": number;
  "productItems": Array<any>;
  "customerId": number;
  products: any[];
  customer: CustomUser;
  constructor(data?: OrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public static getModelName() {
    return "Order";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Order for dynamic purposes.
  **/
  public static factory(data: OrderInterface): Order{
    return new Order(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Order',
      plural: 'Orders',
      path: 'Orders',
      idName: 'id',
      properties: {
        "date": {
          name: 'date',
          type: 'Date'
        },
        "deliveryMethod": {
          name: 'deliveryMethod',
          type: 'number'
        },
        "bookingDate": {
          name: 'bookingDate',
          type: 'Date'
        },
        "deliveryLocation": {
          name: 'deliveryLocation',
          type: 'string'
        },
        "contactPhone": {
          name: 'contactPhone',
          type: 'string'
        },
        "notes": {
          name: 'notes',
          type: 'string'
        },
        "paymentMethod": {
          name: 'paymentMethod',
          type: 'number'
        },
        "status": {
          name: 'status',
          type: 'number'
        },
        "paymentStatus": {
          name: 'paymentStatus',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "productItems": {
          name: 'productItems',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "customerId": {
          name: 'customerId',
          type: 'number'
        },
      },
      relations: {
        products: {
          name: 'products',
          type: 'any[]',
          model: '',
          relationType: 'embedsMany',
                  keyFrom: 'productItems',
          keyTo: 'id'
        },
        customer: {
          name: 'customer',
          type: 'CustomUser',
          model: 'CustomUser',
          relationType: 'belongsTo',
                  keyFrom: 'customerId',
          keyTo: 'id'
        },
      }
    }
  }
}
