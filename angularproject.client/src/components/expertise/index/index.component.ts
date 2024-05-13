import { Component, OnInit } from "@angular/core";

import { ExpertiseSector } from "../expertise.model";
import { HttpClient } from "@angular/common/http";
import { ExpertiseService } from "../expertise.service";

@Component({
  selector: 'expertise-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class ExpertiseIndexComponent implements OnInit {
  public expertises: ExpertiseSector[]=[];

  constructor(
    private http: HttpClient,
    private expertiseService: ExpertiseService
  ) { }

  ngOnInit() {
    this.expertiseService.getExpertises().subscribe(res => {
      var parentExpertises = res.filter(e => e.depth === 0)
        .map(e => { 
          return {
            ...e
          }
        })
      this.expertises = res
    })
  }

 
  title = "expertises";
}

