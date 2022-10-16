export interface DeliveryTypes {
  value: number,
  viewValue: string
}
export interface Orders {
  date: string;
  paymentMethod: number;
  deliveryMethod: number;
  status: number;
  customerId: number; 
}

export const orderStatus=  [
  {value: 0, viewValue: 'PENDING'},
  {value: 1, viewValue: 'APPROVED'},
  {value: 2, viewValue: 'REJECTED'}
];

export const orderStatusObj = {
  0: 'PENDING',
  1: 'APPROVED',
  2: 'REJECTED'
}
