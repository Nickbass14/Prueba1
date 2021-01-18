import {Component} from '@angular/core';

@Component({
    selector: 'mi-componente',
    templateUrl: './mi-componente.component.html'
    
    
})

export class MiComponente{

    public titulo: string;
    public comentario: string;
    public year: number;
    public mostrarHoteles: boolean;

    constructor(){
        this.titulo = "Hola mundo, Soy mi componente";
        this.comentario = " Este es mi primer componente";
        this.year = 2020;
        this.mostrarHoteles =true;

        console.log("Componente cargado");
        console.log(this.titulo, this.comentario,this.year);
    } 
    
    ocultarHoteles(){
        this.mostrarHoteles = false;
    }
}