export interface User {
    id: string;
    userType: String;
    realm:String
    username: string;
    email: string;
    emailVerified:Boolean;
    date:String;
    lastOrder:String;
    totalOrders: Number;
    totalAmount:String;
  }


  export interface UserReport {
    username: string;
    lastDate:String;
    lastOrder:String;
    totalOrders: Number;
    totalAmount:Number;
    customerId:Number;
  }