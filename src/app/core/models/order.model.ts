export interface Order {
  idOrder: number;
  dateTime: string;
  stateOrder: number; 
  paymentMethod: string;
  userId: number;
  orderDetails: OrderDetail[];
  total: number;
}

export interface OrderDetail {
  quantity: number;
  unitPrice: number;
  productName: string;
  subTotal: number;
}
