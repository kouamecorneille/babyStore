import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrytodataService {

  constructor() { }

   // Méthode pour crypter les données
   encryptData(data: any): string {
    // Convertit l'objet en chaîne JSON
    const jsonData = JSON.stringify(data);
    // Crypte la chaîne JSON
    return btoa(jsonData);
  }

  // Méthode pour décrypter les données
  decryptData(encryptedData: string): any {
    // Décrypte la chaîne Base64
    const decryptedJson = atob(encryptedData);
    // Convertit la chaîne JSON en objet
    return JSON.parse(decryptedJson);
  }


}
