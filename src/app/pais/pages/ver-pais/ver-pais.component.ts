import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
//import { tap } from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
    `
    .flag {
      width: 200px;
    }
    `
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Pais;

  constructor(private paisService: PaisService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Recuperar el código del pais de la url y obtener pais
    
    // ... CONCATENACION DE Observables
    // this.activatedRoute.params.subscribe( ({id}) => {
    //   if (id) {
    //     this.paisService.getPais( id )
    //       .subscribe( resp => {
    //         console.log(resp);
    //         if (resp && resp.length > 0){
    //           this.pais = resp[0];
    //         }
    //     });
    //   }
    // });

    // ... CON switchMap de rxjs
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.paisService.getPais( id )),
        tap(console.log) // imprime directamente la respuesta, igual a console.log(resp)
      )
      .subscribe( (paisArray) => {
        this.pais = paisArray[0];
      });
  };

}
