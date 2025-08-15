
export interface Cart {
  total: number;
  cartDetail: CartDetail[];
}

export interface CartDetail {
  productId: number;
  quantity: number;
  UnitPrice: number;
  subTotal: number;
  cartId: number;
}