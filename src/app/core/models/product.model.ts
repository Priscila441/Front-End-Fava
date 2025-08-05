export interface Product {
    idProduct: number;
    nameProduct: string;
    description: string;   
    imagesUrl: string;     
    price: number;         
    stock: number;         
    stateProduct: 'Available' | 'NotAvailable';
    categoryId: number;    
}
