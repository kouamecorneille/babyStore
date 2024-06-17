import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NetworkStatusService } from '../../services/network-status.service';
import { ToastrService } from 'ngx-toastr';

export const networkStatusGuard: CanActivateFn = (route, state) => {
  const networkStatusService = inject(NetworkStatusService);
  const router = inject(Router);
  const toastr = inject(ToastrService)

  // return networkStatusService.isOnline.pipe(
  //   map(isOnline => {
  //     if (!isOnline) {
  //      toastr.error("Oops votre connexion n'est pas stable!", 'Erreur de connexion',{
  //         timeOut:5000
  //       });
  //       // router.navigate(['/offline']);
  //       return false;
  //     }
  //     return true;
  //   })
  // );
  return true;
};
