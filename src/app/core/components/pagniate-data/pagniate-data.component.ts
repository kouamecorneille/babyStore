import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagniate-data',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pagniate-data.component.html',
  styleUrl: './pagniate-data.component.css'
})
export class PagniateDataComponent {

  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Input() totalItems!: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    const totalPages = this.totalPages;
    const pagesArray = [];

    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  }

}
