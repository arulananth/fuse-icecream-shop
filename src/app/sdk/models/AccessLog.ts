/* tslint:disable */

declare var Object: any;
export interface AccessLogInterface {
  "date": Date;
  "agent"?: string;
  "id"?: number;
  "customUserId"?: number;
}

export class AccessLog implements AccessLogInterface {
  "date": Date;
  "agent": string;
  "id": number;
  "customUserId": number;
  constructor(data?: AccessLogInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AccessLog`.
   */
  public static getModelName() {
    return "AccessLog";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AccessLog for dynamic purposes.
  **/
  public static factory(data: AccessLogInterface): AccessLog{
    return new AccessLog(data);
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
      name: 'AccessLog',
      plural: 'AccessLogs',
      path: 'AccessLogs',
      idName: 'id',
      properties: {
        "date": {
          name: 'date',
          type: 'Date'
        },
        "agent": {
          name: 'agent',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "customUserId": {
          name: 'customUserId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
