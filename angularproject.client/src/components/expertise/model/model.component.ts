import { Component, Input } from '@angular/core';
import { ExpertiseSector } from '../expertise.model';

@Component({
  selector: 'expertise',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ExpertiseComponent {
  @Input() expertise = new ExpertiseSector()
}
