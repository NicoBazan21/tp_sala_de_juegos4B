import { Component, OnInit } from '@angular/core';
import { PalabrasService } from 'src/app/services/palabras.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit{
  private path: string = '/assets/img/ahorcado/';
  protected abc = [{letra: 'Q', estado: false },{letra: 'W',estado: false},{letra: 'E',estado: false},{letra: 'R',estado: false},{letra: 'T',estado: false},{letra: 'Y',estado: false},{letra: 'U',estado: false},{letra: 'I',estado: false},{letra: 'O',estado: false},{letra: 'P',estado: false},{letra: 'A',estado: false},{letra: 'S',estado: false},{letra: 'D',estado: false},{letra: 'F',estado: false},{letra: 'G',estado: false},{letra: 'H',estado: false},{letra: 'J',estado: false},{letra: 'K',estado: false},{letra: 'L',estado: false},{letra: 'Ñ',estado: false},{letra: 'Z',estado: false},{letra: 'X',estado: false},{letra: 'C',estado: false},{letra: 'V',estado: false},{letra: 'B',estado: false},{letra: 'N',estado: false},{letra: 'M',estado: false},];
  protected palabra: string = '';
  protected palabraObj: any[] = [];
  private vidas = 1;
  protected img = `${this.path}${this.vidas}.png`;
  protected finalizar = false;

  constructor(private palabrasService: PalabrasService,
    private resultadosService: ResultadosService,
    private userService: UserServiceService){  }

  ngOnInit()
  {
    this.comenzar();
  }

  onClick($event:any)
  {
    console.log($event.srcElement.innerText);
    let bandera = false;
    if(this.vidas < 5)
    {
      if(this.palabra.includes($event.srcElement.innerText.toLowerCase()))
      {
        console.log("la letra esta");
        this.palabraObj.forEach(element => {
          if(element.letra == $event.srcElement.innerText.toLowerCase())
          {
            element.estado = false;
            bandera = true;
          }
        });
      }
      if(bandera == false)
      {
        this.vidas++;
        this.img = `${this.path}${this.vidas}.png`;
      }
      $event.srcElement.disabled = true;
    }
    else
    {
      if(this.vidas == 5)
      {
        this.vidas++;
        this.img = `${this.path}${this.vidas}.png`;
      }
      Swal.fire({
        title: 'Ohh!... Te has ahorcado.',
        text: 'La palabra era  \"' + this.palabra +'\".',
        icon: 'error',
        confirmButtonText: 'Ok.',
        background: '#3b293b',
      })
      this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,0,"Ahorcado","Perdio");
      this.finalizar = true;
    }
  }

  comenzar()
  {
    this.palabrasService.traerPalabra().subscribe((word)=>
    {
      this.palabra = word.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      for(let i = 0; i < this.palabra.length; i++)
      {
        this.palabraObj.push({
          letra: this.palabra[i],
          estado: true
        });
      }
      console.log(this.palabra);
    });
  }

  reiniciar()
  {
    this.vidas = 1;
    this.palabraObj = [];
    this.palabra = '';
    this.finalizar = false;

    this.comenzar();
  }
}
