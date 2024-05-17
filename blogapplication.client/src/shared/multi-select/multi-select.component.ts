import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyPair } from '../../model/keypair.model';

@Component({
  selector: 'multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent {
  @Input() data: KeyPair[] = []
  @Input() selected: string[] = []
  @Input() label: string = ''
  @Input() borderColor: string = ''
  @Input() id:string=''

  @Output() selectedItems: EventEmitter<string[]> = new EventEmitter()

  select(event: any) {
    this.selected.push(event.target.value)
    this.selectedItems.emit(this.selected)
  }

  remove(id: string) {
    this.selected = this.selected.filter(i => i != id)
    this.selectedItems.emit(this.selected)
  }

  getSelected() {
    return this.data.filter(i => this.selected.includes(i.key))
  }

  getRemaining() {
    return this.data.filter(i => !this.selected.includes(i.key))
  }
}
