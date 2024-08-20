import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OsDetectionService {

  constructor() { }

  detectOS(): string {
    const userAgent = window.navigator.userAgent;
    let os = 'Unknown';

    if (userAgent.indexOf('Win') !== -1) {
      os = 'Windows';
    } else if (userAgent.indexOf('Mac') !== -1) {
      os = 'MacOS';
    } else if (userAgent.indexOf('Linux') !== -1) {
      os = 'Linux';
    } else if (userAgent.indexOf('Android') !== -1) {
      os = 'Android';
    } else if (userAgent.indexOf('like Mac') !== -1) {
      os = 'iOS';
    }

    return os;
  }
}
