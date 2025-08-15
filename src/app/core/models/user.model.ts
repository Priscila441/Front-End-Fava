export interface User {
  IdUser: number;
  NameUser: string;
  Password?: string;
  Age: number;
  Email: string;
  Role: 'Admin' | 'Invite';
  orders: OrderDetail[];
}

export interface UserPostDto {
  NameUser: string;
  Email: string;
  Password: string;
}


export interface OrderDetail {
  ProductName: string;
  Quantity: number;
  UnitPrice: number;
}
