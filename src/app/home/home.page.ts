import {Component, ViewChild} from '@angular/core';
import { Howl } from 'howler';
import {IonRange} from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

   generos = [
    {
      genre:'Electronica',
      imagen: 'assets/images/generos/eletronica1.jpg',
    },
    {
      genre:'Vallenato',
      imagen: 'assets/images/generos/vallenato.jpg',
    },
    {
      genre:'Pop',
      imagen: 'assets/images/generos/pop music.jpg',
    },
    {
      genre:'Rock',
      imagen: 'assets/images/generos/rock.jpg',
    },
    {
      genre:'Urbano',
      imagen: 'assets/images/generos/urbano.jpg',
    }
  ];

  constructor(private router:Router) {}
  //constructor() {}

  //Enviar de una pagina a otra
  cambiarPestana(x){
    console.log(x);
    this.router.navigate(['/musica',x]);
  }


}