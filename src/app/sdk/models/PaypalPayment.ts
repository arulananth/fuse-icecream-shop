/* tslint:disable */
import {
  Order
} from '../index';

declare var Object: any;
export interface PaypalPaymentInterface {
  "pay_id": string;
  "payer_id": string;
  "payment_method": string;
  "transaction_id": string;
  "create_time": Date;
  "amount_total": number;
  "amount_currency": string;
  "payment_json": any;
  "id"?: number;
  "orderId"?: number;
  order?: Order;
}

export class PaypalPayment implements PaypalPaymentInterface {
  "pay_id": string;
  "payer_id": string;
  "payment_method": string;
  "transaction_id": string;
  "create_time": Date;
  "amount_total": number;
  "amount_currency": string;
  "payment_json": any;
  "id": number;
  "orderId": number;
  order: Order;
  constructor(data?: PaypalPaymentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PaypalPayment`.
   */
  public static getModelName() {
    return "PaypalPayment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PaypalPayment for dynamic purposes.
  **/
  public static factory(data: PaypalPaymentInterface): PaypalPayment{
    return new PaypalPayment(data);
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
      name: 'PaypalPayment',
      plural: 'PaypalPayments',
      path: 'PaypalPayments',
      idName: 'id',
      properties: {
        "pay_id": {
          name: 'pay_id',
          type: 'string'
        },
        "payer_id": {
          name: 'payer_id',
          type: 'string'
        },
        "payment_method": {
          name: 'payment_method',
          type: 'string'
        },
        "transaction_id": {
          name: 'transaction_id',
          type: 'string'
        },
        "create_time": {
          name: 'create_time',
          type: 'Date'
        },
        "amount_total": {
          name: 'amount_total',
          type: 'number'
        },
        "amount_currency": {
          name: 'amount_currency',
          type: 'string'
        },
        "payment_json": {
          name: 'payment_json',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "orderId": {
          name: 'orderId',
          type: 'number'
        },
      },
      relations: {
        order: {
          name: 'order',
          type: 'Order',
          model: 'Order',
          relationType: 'belongsTo',
                  keyFrom: 'orderId',
          keyTo: 'id'
        },
      }
    }
  }
}
