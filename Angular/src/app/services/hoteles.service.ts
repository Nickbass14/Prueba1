import {Injectable} from '@angular/core';
import {hotel} from '../models/hotel';


@Injectable()
export class hotelesService{

    public hoteles: hotel[];

    constructor(){

        this.hoteles = [
            new hotel("Hotel el panama",2020,"https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/99/43/99439_v4.jpeg"),
          new hotel("Hotel San Remon",2021,"https://cf.bstatic.com/images/hotel/max1024x768/919/91962979.jpg"),
          new hotel("Hotel Riu",2022,"https://media-cdn.tripadvisor.com/media/photo-s/1a/30/e5/aa/hotel-riu-vallarta.jpg")
        ];
    }

    holamundo(){
        return 'Hola mundo desde un servicio de angular';
    }


    getHoteles(){
        return this.hoteles
    }
}