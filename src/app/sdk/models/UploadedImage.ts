/* tslint:disable */

declare var Object: any;
export interface UploadedImageInterface {
  "id"?: number;
  "productId"?: number;
}

export class UploadedImage implements UploadedImageInterface {
  "id": number;
  "productId": number;
  constructor(data?: UploadedImageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UploadedImage`.
   */
  public static getModelName() {
    return "UploadedImage";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UploadedImage for dynamic purposes.
  **/
  public static factory(data: UploadedImageInterface): UploadedImage{
    return new UploadedImage(data);
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
      name: 'UploadedImage',
      plural: 'UploadedImages',
      path: 'UploadedImages',
      idName: 'id',
      properties: {
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
