import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-single-categorie',
  standalone: true,
  imports: [],
  templateUrl: './single-categorie.component.html',
  styleUrl: './single-categorie.component.css'
})
export class SingleCategorieComponent {

  @Input() imageUrl!:string;
  @Input() categorieName!:string;
  @Input() numberItem!:number;



}
