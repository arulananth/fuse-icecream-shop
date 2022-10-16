/* tslint:disable */
import {
  ProductOption,
  ProductAddition,
  UploadedImage
} from '../index';

declare var Object: any;
export interface ProductInterface {
  "name": string;
  "description"?: string;
  "costPerUnit"?: number;
  "cost"?: number;
  "maxOptions"?: number;
  "numOptions"?: number;
  "unitType"?: number;
  "minUnits"?: number;
  "maxUnits"?: number;
  "id"?: number;
  "productCategoryId"?: number;
  productOptions?: ProductOption[];
  productAdditions?: ProductAddition[];
  uploadedImage?: UploadedImage;
}

export class Product implements ProductInterface {
  "name": string;
  "description": string;
  "costPerUnit": number;
  "cost": number;
  "maxOptions": number;
  "numOptions": number;
  "unitType": number;
  "minUnits": number;
  "maxUnits": number;
  "id": number;
  "productCategoryId": number;
  productOptions: ProductOption[];
  productAdditions: ProductAddition[];
  uploadedImage: UploadedImage;
  constructor(data?: ProductInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Product`.
   */
  public static getModelName() {
    return "Product";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Product for dynamic purposes.
  **/
  public static factory(data: ProductInterface): Product{
    return new Product(data);
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
      name: 'Product',
      plural: 'Products',
      path: 'Products',
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
        "costPerUnit": {
          name: 'costPerUnit',
          type: 'number'
        },
        "cost": {
          name: 'cost',
          type: 'number'
        },
        "maxOptions": {
          name: 'maxOptions',
          type: 'number'
        },
        "numOptions": {
          name: 'numOptions',
          type: 'number'
        },
        "unitType": {
          name: 'unitType',
          type: 'number'
        },
        "minUnits": {
          name: 'minUnits',
          type: 'number'
        },
        "maxUnits": {
          name: 'maxUnits',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "productCategoryId": {
          name: 'productCategoryId',
          type: 'number'
        },
      },
      relations: {
        productOptions: {
          name: 'productOptions',
          type: 'ProductOption[]',
          model: 'ProductOption',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'productId'
        },
        productAdditions: {
          name: 'productAdditions',
          type: 'ProductAddition[]',
          model: 'ProductAddition',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'productId'
        },
        uploadedImage: {
          name: 'uploadedImage',
          type: 'UploadedImage',
          model: 'UploadedImage',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'productId'
        },
      }
    }
  }
}
