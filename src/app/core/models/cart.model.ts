
export interface Cart {
  total: number;
  cartDetail: CartDetail[];
}

export interface CartDetail {
  productId: number;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  productName?: string;
  cartId: number;
}