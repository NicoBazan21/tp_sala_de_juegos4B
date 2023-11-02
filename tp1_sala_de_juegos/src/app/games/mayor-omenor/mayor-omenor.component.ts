import { Component } from '@angular/core';
import { ResultadosService } from 'src/app/services/resultados.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-mayor-omenor',
  templateUrl: './mayor-omenor.component.html',
  styleUrls: ['./mayor-omenor.component.css']
})
export class MayorOMenorComponent {
  private path: string = '/assets/img/cartas/';
  constructor(private userService: UserServiceService, private resultadosService: ResultadosService){  }

  numeroActual = this.obtenerRandom();
  img = `${this.path}${this.numeroActual}.png`;

  usuario!: any;
  gano = false;
  perdio = false;

  ngOnInit()
  {

  }

  obtenerRandom()
  {
    return Math.floor(Math.random() * 12);
  }

  mayor() : void | number
  {
    let mayor = this.obtenerRandom();
    this.img = `${this.path}${mayor}.png`;
    if(this.numeroActual < mayor)
    {
      this.perdio = false;
      this.gano = true;
      this.numeroActual = mayor;
      this.userService.sesionFirestore.puntos++;
      this.userService.modificar(this.userService.sesionFirestore);
      this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,1,"MayorMenor","Gano");
      return 0;
    }
    this.perdio = true;
    this.gano = false;
    this.numeroActual = mayor;
    this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,0,"MayorMenor","Perdio");
  }

  menor() : void | number
  {
    let menor = this.obtenerRandom();
    this.img = `${this.path}${menor}.png`;
    if(this.numeroActual > menor)
    {
      this.perdio = false;
      this.gano = true;
      this.numeroActual = menor;
      this.userService.sesionFirestore.puntos++;
      this.userService.modificar(this.userService.sesionFirestore);
      this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,1,"MayorMenor","Gano");
      return 0;
    }
    this.perdio = true;
    this.gano = false;
    this.numeroActual = menor;
    this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,0,"MayorMenor","Perdio");

  }
}
