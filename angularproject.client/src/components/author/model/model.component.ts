import { Component, Input, OnInit } from '@angular/core';
import { Author } from '../../../model/author.model';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../../services/author.service';

@Component({
  selector: 'author-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @Input() author: Author = new Author()
  @Input() authorId: number = 0;
  constructor
    (
    private route: ActivatedRoute,
    private authorService: AuthorService
    ) { }

  ngOnInit(): void {
    if (!this.author.authorId && !this.authorId) {
      this.route.params.subscribe(params => {
        if (params["id"]) {
          this.authorId = params["id"]
          this.fetchAuthor()
        }
        else {
          var param1 = this.route.snapshot.paramMap.get("param1");
          if (param1 && !isNaN(parseInt(param1 as string))) {
            this.authorId = parseInt(param1 as string)
            this.fetchAuthor()
          }
        }
      })
    }
    else if (!this.author) {
      console.log(this.author, this.authorId)
      this.fetchAuthor()
    }
  }

  fetchAuthor() {
    this.authorService.getAuthor(this.authorId).subscribe((result: Author) => {
      this.author = result;
      console.log(result)
    })
  }
}