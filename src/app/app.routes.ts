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
            data: { rol: 'ADMIN' }
      },


      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuarios/usuarios.component')
            .then(m => m.UsuariosComponent),
            data: { rol: 'ADMIN' }
      },

      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/productos/productos.component')
            .then(m => m.ProductosComponent),
            data: { rol: 'ADMIN' }
      },

      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/clientes.component')
            .then(m => m.ClientesComponent),
            data: { rol: 'ADMIN,EMPLEADO' }
      },

       { path: 'servicios',
         loadComponent: () =>
          import('./pages/servicio/servicio.component')
         .then(m => m.ServiciosComponent),
         data: { rol: 'ADMIN,EMPLEADO' } },

      { path: 'citas',
         loadComponent: () =>
          import('./pages/citas/citas.component')
         .then(m => m.CitasComponent),
        data: { rol: 'ADMIN,EMPLEADO' } },


      {
        path: 'ventas',
        loadComponent: () =>
          import('./pages/ventas/ventas.component')
            .then(m => m.VentasComponent),
            data: { rol: 'ADMIN,EMPLEADO' }
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard',loadComponent: () =>
          import('./pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
            data: { rol: 'ADMIN' }
      },

      {
        path: 'login',
        component: LoginComponent
      },


      {
        path: 'reportes',
        loadComponent: () =>
          import('./pages/reportes/reportes.component')
            .then(m => m.ReportesComponent),
            data: { role: 'ADMIN' }
        }
    ]
  }

];
