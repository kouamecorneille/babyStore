import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CrytodataService } from '../../services/crytodata.service';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const crypt = inject(CrytodataService);

  function getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      const djassa2Access = localStorage.getItem("Djassa2Access");
      if (djassa2Access) {
        return crypt.decryptData(djassa2Access);
      }
    }
    return null;
  }

  const token = getToken();

  // Clone the request and add the authentication token to the headers if available
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq);
};
