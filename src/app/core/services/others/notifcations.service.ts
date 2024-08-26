import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BehaviorSubject, take } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { AuthenticateService } from '../auth/authenticate.service';
import { User } from '../../interfaces/Iuser';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifcationsService {

  fcm_token = new BehaviorSubject<string>('');
  userSession: User;

  constructor(
    private apiService: ApiService,
    private afMessaging: AngularFireMessaging,
    private authService: AuthenticateService,
    private toastr: ToastrService
  ) {
    this.userSession = this.authService.getUser()!;
  }

  getToken(): void {
    const token = localStorage.getItem('fcm_token');
    if (token) {
      this.fcm_token.next(token);
    }
  }

  subscribeToShop(receive_notifications: boolean, shop: string): void {
    if (this.userSession) {
      this.requestPermission();
      if (this.fcm_token.value) {
        const data = {
          user: this.userSession.id,
          shop: shop,
          receive_notifications: receive_notifications,
          fcm_token: this.fcm_token.value
        };

        this.apiService.postItem(data, 'subscribers').subscribe(
          (response: any) => {
            if (response) {
              this.toastr.success('Votre abonnement a été pris en compte !', 'Abonnement !');
            }
          },
          (error: any) => {
            console.error('Subscription error:', error);
            this.toastr.error('Oops, erreur lors de votre abonnement !', 'Abonnement !');
          }
        );
      } else {
        this.toastr.error('Vous devez accepter de recevoir les notifications !', 'Abonnement !');
      }
    } else {
      this.toastr.error('Connectez-vous d\'abord pour vous abonner à cette boutique !', 'Oops, erreur !');
    }
  }

  setToken(fcm_token: string) {
    localStorage.setItem('fcm_token', fcm_token);
    this.fcm_token.next(fcm_token);
  }

  requestPermission() {
    this.afMessaging.requestToken
      .pipe(take(1))
      .subscribe(
        (token: string | null) => {
          console.log('Notification permission granted. Token:', token);
          this.setToken(token!);
        },
        (error) => {
          console.error('Unable to get permission to notify.', error);
        }
      );
  }

  listenForMessages() {
    this.afMessaging.messages
      .subscribe((message: any) => {
        console.log('New notification received:', message);
        // Handle the notification here
      });
  }
}
