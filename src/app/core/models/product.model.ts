export interface Product {
    idProduct: number;
    nameProduct: string;
    description: string;   
    ImagesUrl: string;     
    price: number;         
    stock: number;         
    stateProduct: 'Available' | 'NotAvailable';
    categoryId: number;    
}
