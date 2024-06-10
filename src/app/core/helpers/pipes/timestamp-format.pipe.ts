import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampFormat'
})
export class TimestampFormatPipe implements PipeTransform {
  transform(value: number, format: string = 'yyyy-MM-dd HH:mm:ss'): string {
    if (!value) return '';
    const date = new Date(value * 1000); // Convertit le timestamp en millisecondes
    return this.formatDate(date, format);
  }

  private formatDate(date: Date, format: string): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n); // Fonction pour le rembourrage
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return (format as string)
      .replace('yyyy', year.toString())
      .replace('MM', month.toString())
      .replace('dd', day.toString())
      .replace('HH', hours.toString())
      .replace('mm', minutes.toString())
      .replace('ss', seconds.toString());

  }
}
