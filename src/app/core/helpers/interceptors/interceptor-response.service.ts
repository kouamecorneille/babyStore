import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticateService } from '../../services/auth/authenticate.service';
import { ToastrService } from 'ngx-toastr';
import { CrytodataService } from '../../services/crytodata.service';
import { Token } from '../../interfaces/Iuser';

@Injectable({
  providedIn: 'root'
})

export class InterceptorResponseService implements HttpInterceptor{

  constructor(private authService:AuthenticateService,private toastr: ToastrService,private crypt:CrytodataService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((error:HttpErrorResponse) =>{
          if (error.error) {
            console.log("Backend status: ", error.status);
            console.log("Backend error: ", error.error);

            if (error.status == 401){

              return this.handle403Error(req, next);

            }else if(error.status==500){
              this.toastr.error("Oops erreur interne du serveur !", 'Erreur',{
                timeOut:3000
              });
            }else if(error.status==404 || 400){

            }
          }
          return throwError("Error happend.")
        })
      )
  }


  private handle403Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Appel du service d'authentification pour obtenir un nouveau jeton
    return this.authService.refreshToken().pipe(
      switchMap((response: Token) => {
        // Une fois que vous avez obtenu le nouveau jeton, modifiez la demande actuelle pour inclure ce jeton
        localStorage.setItem('Djassa2Access', this.crypt.encryptData(response.access));
        localStorage.setItem('Djassa2Refrech', this.crypt.encryptData(response.refresh));

        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${response.access}`
          }
        });

        // Réessayez la demande avec le nouveau jeton
        return next.handle(authReq);
      }),
      catchError((error: any) => {
        // Gérer les erreurs de renouvellement du jeton
        console.error('Failed to refresh token', error);
        // Vous pouvez rediriger vers la page de connexion ou effectuer une autre action appropriée
        return throwError(error);
      })
    );
  }

}
