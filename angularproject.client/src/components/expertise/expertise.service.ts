import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ExpertiseSector } from "./expertise.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class ExpertiseService {

  constructor(
    private http: HttpClient
  ) {}

  getExpertises() {
    return this.http.get<ExpertiseSector[]>('/api/expertisesector')
  }

}
