import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {


  private currentVersion: string = '1.0.0'; // Valeur par défaut initiale
  private previousVersion: string = '1.0.0'; // Valeur par défaut initiale

  constructor(private updates: SwUpdate, private http: HttpClient) {
    this.getVersions().subscribe(versions => {
      this.previousVersion = versions.previousVersion;
      this.currentVersion = versions.currentVersion;
      this.checkForUpdates();
    });
  }

  getVersions(): Observable<{ previousVersion: string, currentVersion: string }> {
    return this.http.get<{ previousVersion: string, currentVersion: string }>('/version.json').pipe(
      catchError(() => of({ previousVersion: 'Unknown', currentVersion: 'Unknown' })) // Gestion des erreurs si le fichier n'est pas trouvé
    );
  }

  checkForUpdates() {
    const storedVersion = localStorage.getItem('appVersion');

    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe(event => {
        switch (event.type) {
          case 'VERSION_READY':
            if (storedVersion !== this.currentVersion) {
              this.promptUser();
            }
            break;
          case 'VERSION_DETECTED':
            console.log(`Nouvelle version détectée : ${this.currentVersion}`);
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log('Échec de l\'installation de la nouvelle version');
            break;
        }
      });
    }
  }

  private promptUser() {
    if (confirm(`Une nouvelle version (${this.currentVersion}) est disponible. Voulez-vous la charger ?`)) {
      this.clearCacheAndReload();
    }
  }

  private clearCacheAndReload() {
    if ('caches' in window) {
      caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
          return caches.delete(key);
        }));
      }).then(() => {
        localStorage.setItem('appVersion', this.currentVersion); // Met à jour la version actuelle dans le stockage
        window.location.reload(); // Recharge l'application
      });
    } else {
      localStorage.setItem('appVersion', this.currentVersion); // Met à jour la version actuelle dans le stockage
      location.reload(); // Recharge l'application si 'caches' n'est pas supporté
    }
  }
}

