import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  if(!authService.isLogged()){
    router.navigate(['/']);
    return false;
  }

  const rol = authService.getRol();
  const roleRoute = route.data['rol'];

  if(roleRoute && !roleRoute.includes(rol)){
    router.navigate(['/dashboard']);
    return false;
  }

  return true;

};
