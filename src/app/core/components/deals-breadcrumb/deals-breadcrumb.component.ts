import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ICategory } from '../../interfaces/Icategory';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deals-breadcrumb',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './deals-breadcrumb.component.html',
  styleUrl: './deals-breadcrumb.component.css'
})
export class DealsBreadcrumbComponent {

  @Input() title!:string
  @Input() hasCategorie!:boolean
  @Input() items!:ICategory[] | null

  generateSlug(text: string): string {
    // Remplace les caractères spéciaux et convertit en minuscules
    const slug = text.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remplace les caractères spéciaux par des tirets
      .trim()
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/--+/g, '-'); // Remplace les doubles tirets par un seul tiret

    return slug;
  }

}
