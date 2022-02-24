import { Component, EventEmitter } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Observable } from 'rxjs';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    .list-group-item {
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Pais[] = [];
  placeholder: string = 'Buscar por pais...';
  paisesSugeridos: Pais[] = [];
  terminoSugerido: string = '';
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {
  }

  buscar( terminoBusqueda: string ) {
    
    this.termino = terminoBusqueda;
    this.hayError = false;
    this.mostrarSugerencias = false;

    const retorno: Observable<Pais[]> = this.paisService.buscarPais( terminoBusqueda );
    retorno.subscribe({
      next: (paises) => {this.paises = paises; console.log(paises)}, 
      error: (err) => {this.hayError = true; this.paises = []}
    });
  }
  
  sugerencias( termino: string) {
    console.log('SUGENRECIAS', termino);
    this.paisService.buscarPais( termino )
      .subscribe( paises => {
        this.terminoSugerido = termino;
        this.paisesSugeridos = paises.splice(0,5);
        if (this.paisesSugeridos.length > 0) {
          this.mostrarSugerencias = true;
        }
      });
  }

  buscarSugerencia( termino:string ) {
    this.buscar(termino);
  }
}
