import { HttpHeaderResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError,  throwError  } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const token = localStorage.getItem("token");

  if(token){

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned).pipe(

      catchError((error) => {

        if (error.status === 401) {

          localStorage.removeItem('token');
          router.navigate(['/login']);
        }

        return throwError(() => error);
      })

    );
  }

  return next(req);
};


