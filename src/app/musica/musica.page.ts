import {Component, ViewChild} from '@angular/core';
import { Howl } from 'howler';
import {IonRange} from '@ionic/angular';

export interface cancion {
  genre: string;
  nombre: string;
  artista: string;
  caratulaAlbum: string;
  song: string;
  
}

@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
})
export class MusicaPage{

  caratulas: cancion[] = [
    {
      genre:'Electronica',
      nombre: 'Oracle',
      caratulaAlbum: 'assets/images/Oracle Timmy.jpg',
      song: 'assets/music/Oracle Timmy Tm.mp3',
      artista: 'Timmy Trumppet'
    },
    {
      genre:'Electronica',
      nombre: 'Melody',
      caratulaAlbum: 'assets/images/melodyDimitri.jpg',
      song: 'assets/music/dimitri-vegas-like-mike-steve-aoki-vs-ummet-ozcan-melody.mp3',
      artista: 'Dimitri Vegas & Like Mike'
    },
    {
      genre:'Electronica',
      nombre: 'You make me',
      caratulaAlbum: 'assets/images/Avicii Make me.jpg',
      song: 'assets/music/avicii-you-make-me.mp3',
      artista: 'Avicii'
    },
    {
      genre:'Electronica',
      nombre: 'Over and out',
      caratulaAlbum: 'assets/images/OverAndOut.jpg',
      song: 'assets/music/kshmr-x-hard-lights-over-and-out-feat-charlott-boss-official-audio.mp3',
      artista: 'KSHMR'
    },
    {
      genre:'Electronica',
      nombre: 'No money',
      caratulaAlbum: 'assets/images/Galantis.jpg',
      song: 'assets/music/galantis-no-money-lyrics.mp3',
      artista: 'Galantis'
    },
    // VALLENATO
    {
      genre:'Vallenato',
      nombre: 'Amor de locos',
      caratulaAlbum: 'assets/images/amorDeLocos.jpg',
      song: 'assets/music/amor-de-locos-video-oficial-peter-manjarres-ft-mono-zabaleta-dani-maestre.mp3',
      artista: 'Peter Manjarres'
    },
    {
      genre:'Vallenato',
      nombre: 'La creciente',
      caratulaAlbum: 'assets/images/rafael orozco.jpg',
      song: 'assets/music/binomio-de-oro-rafael-orozco-la-creciente.mp3',
      artista: 'Rafael Orozco'
    },
    {
      genre:'Vallenato',
      nombre: 'Sombra perdida',
      caratulaAlbum: 'assets/images/rafael orozco.jpg',
      song: 'assets/music/binomio-de-oro-rafael-orozco-la-creciente.mp3',
      artista: 'Rafael Orozco'
    },
  ];

  iniciarCancion: cancion = null;
  reproductor: Howl = null;
  estaReproducion = false;
  progreso = 0;
  @ViewChild('range', {static: false}) range: IonRange;

  constructor() { }

  iniciar(track: cancion) {
    //this.router.navigate(['/musica',track]);

    if (this.reproductor) {
        this.reproductor.stop();
    }
    this.reproductor = new Howl({
        src: [track.song],
        html5: true,
        onplay: () => { // forma parte de Howler
            console.log('reproduciendo');
            this.estaReproducion = true;
            this.iniciarCancion = track;
            this.actualizarProgreso();
        },
        onend: () => { // forma parte de Howler
            console.log('finalizo');
        }
    });
    this.reproductor.play();
}

toggleReproductor(pause) {
    this.estaReproducion = !pause;
    if (pause) {
        console.log('cancion pausada');
        this.reproductor.pause();
    } else {
        console.log('continua cancion');
        this.reproductor.play();
    }
}

siguiente() {
    console.log('siguiente cancion');
    const index = this.caratulas.indexOf(this.iniciarCancion);
    if (index !== this.caratulas.length - 1) {
        this.iniciar(this.caratulas[index + 1]);
    } else {
        this.iniciar(this.caratulas[0]);
    }
}

anterior() {
    console.log('cancion anterior');
    const index = this.caratulas.indexOf(this.iniciarCancion);
    if (index > 0) {
        this.iniciar(this.caratulas[index - 1]);
    } else {
        this.iniciar(this.caratulas[this.caratulas.length - 1]);
    }
}

seek() {
  const newValue = + this.range.value;
  const duration = this.reproductor.duration();
  this.reproductor.seek(duration * (newValue / 100));
}

actualizarProgreso() {
    const seek = this.reproductor.seek();
    this.progreso = (seek / this.reproductor.duration()) * 100 || 0;
    setTimeout(() => {
        this.actualizarProgreso();
    }, 1000);
}

ngOnInit() {
  
}

}
