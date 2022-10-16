/* tslint:disable */
import {
  Product
} from '../index';

declare var Object: any;
export interface ProductCategoryInterface {
  "name": string;
  "id"?: number;
  products?: Product[];
}

export class ProductCategory implements ProductCategoryInterface {
  "name": string;
  "id": number;
  products: Product[];
  constructor(data?: ProductCategoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProductCategory`.
   */
  public static getModelName() {
    return "ProductCategory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProductCategory for dynamic purposes.
  **/
  public static factory(data: ProductCategoryInterface): ProductCategory{
    return new ProductCategory(data);
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
      name: 'ProductCategory',
      plural: 'ProductCategories',
      path: 'ProductCategories',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        products: {
          name: 'products',
          type: 'Product[]',
          model: 'Product',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'productCategoryId'
        },
      }
    }
  }
}
