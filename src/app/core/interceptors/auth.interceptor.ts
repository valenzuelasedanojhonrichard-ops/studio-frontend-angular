import { HttpHeaderResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError,  throwError  } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const token = localStorage.getItem("token");

  let request = req;

  if(token){

    request  = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(request).pipe(

      catchError((error) => {

        if (error.status === 401 || error.status === 403) {

          localStorage.removeItem('token');
          router.navigate(['/login']);
        }

        return throwError(() => error);
      })

    );
  }

  return next(req);
};


