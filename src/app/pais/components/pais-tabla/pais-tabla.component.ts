import { Component, Input } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styles: [
    `
    .bandera-img {
      width:80px;
    }
    `
  ]
})
export class PaisTablaComponent {

  @Input('paises') paises: Pais[] = [];

  constructor() { }

}
