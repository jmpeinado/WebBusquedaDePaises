import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{

  @Output() onEnterBuscarPais: EventEmitter<string> = new EventEmitter();
  @Output() onDebounceBuscarPais: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  termino: string = '';
  @Input() placeholder: string = '';

  ngOnInit(): void {
   this.debouncer
    .pipe(debounceTime(500))
    .subscribe( valor => {
     this.onDebounceBuscarPais.emit( valor );
    }); 
  }

  constructor() { }

  buscar() {
    this.onEnterBuscarPais.emit( this.termino );
  }

  teclaPresionada() {
    this.debouncer.next( this.termino );
  }

}
