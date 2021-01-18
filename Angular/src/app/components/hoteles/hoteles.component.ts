import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {hotel} from '../../models/hotel';
import {hotelesService} from '../../services/hoteles.service';

@Component({
  selector: 'hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css'],
  providers: [hotelesService]
})
export class HotelesComponent implements OnInit, DoCheck, OnDestroy {
    public titulo: string
    public hoteles: hotel[];

  constructor(
    private _hotelesService: hotelesService
  ) { 
    this.titulo = "Componente hoteles";
    this.hoteles = this._hotelesService.getHoteles();
      
  }

  ngOnInit(): void {
    console.log(this.hoteles);
    console.log("Componente uniciado");
    console.log(this._hotelesService.holamundo());
  }

  ngDoCheck(){
    console.log("Docheck lanzado");
  }

  cambiarTitulo(){
    this.titulo = "El titulo ha sido cambiado ";
  }
  
  ngOnDestroy(){
    console.log("El componente se va a eliminar");
  }
}
