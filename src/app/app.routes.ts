import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
            data: { role: 'ADMIN' }
      },

      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuarios/usuarios.component')
            .then(m => m.UsuariosComponent),
            data: { role: 'ADMIN' }
      },

      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/productos/productos.component')
            .then(m => m.ProductosComponent),
            data: { role: 'ADMIN,EMPLEADO' }
      },

      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/clientes.component')
            .then(m => m.ClientesComponent),
            data: { role: 'ADMIN,EMPLEADO' }
      },

      {
        path: 'ventas',
        loadComponent: () =>
          import('./pages/ventas/ventas.component')
            .then(m => m.VentasComponent),
            data: { role: 'ADMIN,EMPLEADO' }
      }

    ]
  }

];
