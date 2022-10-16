/* tslint:disable */

declare var Object: any;
export interface ProductOptionInterface {
  "name": string;
  "description"?: string;
  "cost"?: number;
  "costPerUnit"?: number;
  "id"?: number;
  "productId"?: number;
}

export class ProductOption implements ProductOptionInterface {
  "name": string;
  "description": string;
  "cost": number;
  "costPerUnit": number;
  "id": number;
  "productId": number;
  constructor(data?: ProductOptionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProductOption`.
   */
  public static getModelName() {
    return "ProductOption";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProductOption for dynamic purposes.
  **/
  public static factory(data: ProductOptionInterface): ProductOption{
    return new ProductOption(data);
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
      name: 'ProductOption',
      plural: 'ProductOptions',
      path: 'ProductOptions',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "cost": {
          name: 'cost',
          type: 'number'
        },
        "costPerUnit": {
          name: 'costPerUnit',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "productId": {
          name: 'productId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
