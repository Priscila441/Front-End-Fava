import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Admin } from './features/administrador/admin/admin';
import { AdminProduct } from './features/administrador/admin/admin-product/admin-product';
import { ProductForm } from './features/administrador/admin/product-form/product-form';

export const routes: Routes = [
    { path: '',component: Home},
    { path: 'home', component: Home },
    { path: 'admin', component: Admin , 
        children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full' 
      },
      {
        path: 'products',
        component: AdminProduct
      },
      {
        path: 'create',
        component: ProductForm
      },
      {
        path: 'edit/:id',
        component: ProductForm
      }
    ]
    },
     
    
];
