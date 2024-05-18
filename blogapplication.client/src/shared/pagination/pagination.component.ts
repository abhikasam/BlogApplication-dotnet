import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { XPagination } from '../../model/xpagination.model';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() params: XPagination = new XPagination()

  pageSize: number = 10
  pageNumber: number = 1
  totalPages: number=1

  @Output() update: EventEmitter<XPagination> = new EventEmitter()

  ngOnInit(): void {
    console.log(this.params)
  }


  changePageSize(event: any) {
    this.params.pageSize = event.target.value
    this.update.emit(this.params)
  }

  updatePage(pageNumber: number) {
    this.params.pageNumber = pageNumber
    this.update.emit(this.params)
  }

}
