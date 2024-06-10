import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrytodataService } from '../../services/crytodata.service';

@Injectable({
  providedIn: 'root'
})

export class InterceptorRequestsService implements HttpInterceptor{

  constructor(private crypt:CrytodataService) { }

  /**
   * @method
   * @name intercept
   * @kind method
   * @memberof InterceptorRequestsService
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken();
    if (token){
      const clonedRequest = req.clone({
          setHeaders:{
            Authorization: "Bearer " + token
          }
        }
      );
      return next.handle(clonedRequest);

    }else{
      return next.handle(req);
    }
  }



  /**
   * @method
   * @name getToken
   * @kind method
   * @memberof InterceptorRequestsService
   * @private
   * @returns {string | null}
   */
  private getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      let djassa2Access = localStorage.getItem("Djassa2Access");
      if (djassa2Access) {
        return this.crypt.decryptData(djassa2Access);
      }
    }
    return null;
  }




}
