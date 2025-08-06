import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { CartComponent } from './features/cart/cartComponent';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
      //Públicas
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: 'cart', component: CartComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/administrador/admin/admin').then(m => m.Admin)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/administrador/admin/admin-product/admin-product').then(m => m.AdminProduct)
      },
      {
        path: 'product-form',
        loadComponent: () => import('./features/administrador/admin/product-form/product-form').then(m => m.ProductForm)
      },
      {
        path: 'product-form/:id',
        loadComponent: () => import('./features/administrador/admin/product-form/product-form')
          .then(m => m.ProductForm)
      }

    ]
  }
  
];
