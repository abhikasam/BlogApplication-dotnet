import { Component } from '@angular/core';
import { Author } from '../../../model/author.model';
import { AuthorService } from '../../../services/author.service';

@Component({
  selector: 'author-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  public authors: Author[] = []

  constructor(private authorService: AuthorService) { }
  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((res: Author[]) => {
      this.authors = res;
    })
  }

}
