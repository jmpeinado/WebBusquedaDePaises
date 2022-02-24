import { Component, OnInit } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Pais[] = [];
  estanCargadosPaises: boolean = true;

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  getClassButton( region:string ) {
    return region === this.regionActiva ? 'btn-primary' : 'btn-outline-primary'
  }
  activarRegion(region: string) {
    // Para asegurarnos que no se recargan los datos si ya estamos en esa region (este caso porque no va a cambiar el contenido)
    if (region === this.regionActiva) {return;}
    // Ponemos el mensaje de cargando
    this.estanCargadosPaises = false;
    this.regionActiva = region;
    // Limpiamos paises antes de cargar los nuevos, simplemente por mejora visual
    this.paises = [];
    this.paisService.buscarPaisPorRegion( region )
      .subscribe( result => {
        this.paises = result;
        this.estanCargadosPaises = true;
      }
    );
  }

}
