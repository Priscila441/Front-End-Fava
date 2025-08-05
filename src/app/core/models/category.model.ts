import { Product } from "./product.model";

export interface Category{
    IdCategory: number;
    NameCategory: string;
    Products: Product[];
}