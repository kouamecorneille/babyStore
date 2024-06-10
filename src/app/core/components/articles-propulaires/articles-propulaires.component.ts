import { Component, Input } from '@angular/core';
import { SingleProductComponent } from "../single-product/single-product.component";

@Component({
    selector: 'app-articles-propulaires',
    standalone: true,
    templateUrl: './articles-propulaires.component.html',
    styleUrl: './articles-propulaires.component.css',
    imports: [SingleProductComponent]
})
export class ArticlesPropulairesComponent {

    @Input() title!:string

}
