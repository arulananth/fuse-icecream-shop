/* tslint:disable */
import {
  AccessLog
} from '../index';

declare var Object: any;
export interface CustomUserInterface {
  "userType": string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "password"?: string;
  accessTokens?: any[];
  accessLogs?: AccessLog[];
  identities?: any[];
  credentials?: any[];
}

export class CustomUser implements CustomUserInterface {
  "userType": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "password": string;
  accessTokens: any[];
  accessLogs: AccessLog[];
  identities: any[];
  credentials: any[];
  constructor(data?: CustomUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CustomUser`.
   */
  public static getModelName() {
    return "CustomUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CustomUser for dynamic purposes.
  **/
  public static factory(data: CustomUserInterface): CustomUser{
    return new CustomUser(data);
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
      name: 'CustomUser',
      plural: 'CustomUsers',
      path: 'CustomUsers',
      idName: 'id',
      properties: {
        "userType": {
          name: 'userType',
          type: 'string',
          default: 'customer'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        accessLogs: {
          name: 'accessLogs',
          type: 'AccessLog[]',
          model: 'AccessLog',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'customUserId'
        },
        identities: {
          name: 'identities',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        credentials: {
          name: 'credentials',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
