/* tslint:disable */

declare var Object: any;
export interface ProductAdditionInterface {
  "name": string;
  "description"?: string;
  "cost"?: number;
  "id"?: number;
  "productId"?: number;
}

export class ProductAddition implements ProductAdditionInterface {
  "name": string;
  "description": string;
  "cost": number;
  "id": number;
  "productId": number;
  constructor(data?: ProductAdditionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProductAddition`.
   */
  public static getModelName() {
    return "ProductAddition";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProductAddition for dynamic purposes.
  **/
  public static factory(data: ProductAdditionInterface): ProductAddition{
    return new ProductAddition(data);
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
      name: 'ProductAddition',
      plural: 'ProductAdditions',
      path: 'ProductAdditions',
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
