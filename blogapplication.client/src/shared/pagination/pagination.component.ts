import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationParams } from '../../model/paginatedResult.model';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() params: PaginationParams = new PaginationParams()
  @Output() update: EventEmitter<PaginationParams> = new EventEmitter()

  changePageSize(event: any) {
    this.params.pageSize = event.target.value
    this.update.emit(this.params)
  }

  updatePage(pageNumber: number) {
    this.params.pageNumber = pageNumber
    this.update.emit(this.params)
  }

}
