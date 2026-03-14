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

  const role = authService.getRole();
  const roleRoute = route.data['role'];

  if(roleRoute && !roleRoute.includes(role)){
    router.navigate(['/dashboard']);
    return false;
  }

  return true;

};
