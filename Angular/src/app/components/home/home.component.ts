import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tittle: string;
  constructor() { 

    this.tittle = 'Ultimos articulos';

  }

  ngOnInit(): void {
  }

}
