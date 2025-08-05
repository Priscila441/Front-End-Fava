import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Admin } from './features/administrador/admin/admin';
import { AdminProduct } from './features/administrador/admin/admin-product/admin-product';
import { ProductForm } from './features/administrador/admin/product-form/product-form';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
      // podés agregar otras públicas aquí
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
