
export interface Order {
  IdOrder: number;
  DateTime: string;
  StateOrder: number;
  PaymentMethod: string;
  UserId: number;
  OrderDetails: OrderDetail[];
  Total: number;
}
export interface OrderDetail {
  Quantity: number;
  UnitPrice: number;
  ProductName: string;
  SubTotal: number;
}