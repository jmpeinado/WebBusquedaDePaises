import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Pais[] = [];
  placeholder: string = 'Buscar por capital...';

  constructor(private paisService: PaisService) {
  }

  buscar( terminoBusqueda: string ) {
    
    this.termino = terminoBusqueda;
    this.hayError = false;

    const retorno: Observable<Pais[]> = this.paisService.buscarCapital( terminoBusqueda );
    retorno.subscribe({
      next: (paises) => {this.paises = paises; console.log(paises)}, 
      error: (err) => {this.hayError = true; this.paises = []}
    });
  }
}
