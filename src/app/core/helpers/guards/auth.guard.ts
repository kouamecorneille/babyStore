import { CanActivateFn } from '@angular/router';
import {  inject } from '@angular/core';
import { LoginService } from './login.service';


export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(LoginService).canActivateFn()
};


