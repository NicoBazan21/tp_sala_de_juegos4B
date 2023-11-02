import { Component, OnInit } from '@angular/core';
import { ResultadosService } from 'src/app/services/resultados.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit{
  private path: string = '/assets/img/blackjack/';
  protected imgCrupier = '';
  protected imgJugador = '';

  protected manoCrupier: any[] = [];
  protected valorProvisional = 0;
  protected valorCrupierFinal = 0;

  protected finalizar = false;
  protected manoJugador: any[] = [];
  protected valorJugador = 0;


  constructor(private userService: UserServiceService, private resultadosService: ResultadosService){}

  ngOnInit()
  {
    this.generarManoCrupier();
    this.generarManoJugador();
  }

  public reiniciar()
  {
    this.manoCrupier = [];
    this.valorProvisional = 0;
    this.valorCrupierFinal = 0;
    this.finalizar = false;
    this.manoJugador = [];
    this.valorJugador = 0;

    this.generarManoCrupier();
    this.generarManoJugador();
  }

  public pedir()
  {
    let numero = this.cartaRandom();
    if(numero == 11)
    {
      this.imgJugador = `${this.path}${numero}A.jpg`;
    }
    else if(numero == 10)
    {
      this.imgJugador = `${this.path}${numero}${this.caracterAleatorio()}.jpg`;
    }
    else
    {
      this.imgJugador = `${this.path}${numero}.jpg`;
    }
    this.manoJugador.push(
      {
        carta: this.imgJugador,
        valor: numero
      }
    );
    this.valorJugador += numero;
    if(this.valorJugador > 21)
    {
      this.finalizar = true;
      this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,0,"BlackJack","Perdio");
      setTimeout(()=>{
        Swal.fire({
          title: 'Perdiste!.',
          text: 'Te pasaste de 21',
          icon: 'error',
          confirmButtonText: 'Finalizar',
          background: '#3b293b',
        })
      }, 1500);
    }

    if(this.valorJugador == 21)
    {
      this.finalizar = true;
      this.userService.sesionFirestore.puntos += 7;
      this.userService.modificar(this.userService.sesionFirestore);
      this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,7,"BlackJack","Gano");
      setTimeout(()=>{
        Swal.fire({
          title: 'BlackJack!.',
          text: '',
          icon: 'success',
          confirmButtonText: 'Finalizar',
          background: '#3b293b',
        })
      }, 1500);
    }
  }
  public quedarse()
  {
    this.finalizar = true;
    if(this.valorCrupierFinal > 21 && this.valorJugador < 21)
    {
      this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,5,"BlackJack","Gano");
      setTimeout(()=>
      {
        Swal.fire({
          title: 'Ganaste!.',
          text: 'El crupier se pasó de 21!.',
          icon: 'success',
          confirmButtonText: 'Finalizar',
          background: '#3b293b',
        })
      }, 1500);
      this.userService.sesionFirestore.puntos += 5;
      this.userService.modificar(this.userService.sesionFirestore);
    }
    else if(this.valorJugador > this.valorCrupierFinal)
    {
      setTimeout(() => {
        Swal.fire({
          title: 'Ganaste!.',
          text: 'Le ganaste al crupier en las cartas!.',
          icon: 'success',
          confirmButtonText: 'Finalizar',
          background: '#3b293b',
        })
      }, 1500);
      this.userService.sesionFirestore.puntos += 5;
      this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,5,"BlackJack","Gano");
      this.userService.modificar(this.userService.sesionFirestore);
    }
    else
    {
      this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,0,"BlackJack","Perdio");
      setTimeout(() => {
        Swal.fire({
          title: 'Perdiste!.',
          text: 'El crupier te ha ganado!.',
          icon: 'error',
          confirmButtonText: 'Finalizar',
          background: '#3b293b',
        })
      }, 1500);
    }
  }

  generarManoJugador()
  {
    let valor = 0;
    for(let i = 0; i < 2; i++)
    {
      let numero = this.cartaRandom();
      if(numero == 11)
      {
        this.imgJugador = `${this.path}${numero}A.jpg`;
      }
      else if(numero == 10)
      {
        this.imgJugador = `${this.path}${numero}${this.caracterAleatorio()}.jpg`;
      }
      else
      {
        this.imgJugador = `${this.path}${numero}.jpg`;
      }
      this.manoJugador.push(
        {
          carta: this.imgJugador,
          valor: numero
        }
      );
      valor += numero;
    }
    console.log(this.manoJugador.reverse());
    this.valorJugador = valor;
    if(this.valorJugador == 21)
    {
      this.finalizar = true;
      Swal.fire({
        title: 'BlackJack!.',
        text: '',
        icon: 'success',
        confirmButtonText: 'Finalizar',
        background: '#3b293b',
      })
      this.userService.sesionFirestore.puntos += 7;
      this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,7,"BlackJack","Gano");
      this.userService.modificar(this.userService.sesionFirestore);
    }
  }


  generarManoCrupier()
  {
    let valor = 0;
    do{
      let numero = this.cartaRandom();
      if(numero == 11)
      {
        this.imgCrupier = `${this.path}${numero}A.jpg`;
      }
      else if(numero == 10)
      {
        this.imgCrupier = `${this.path}${numero}${this.caracterAleatorio()}.jpg`;
      }
      else
      {
        this.imgCrupier = `${this.path}${numero}.jpg`;
      }
      this.manoCrupier.push(
        {
          carta: this.imgCrupier,
          valor: numero
        }
      );
      valor += numero;
    }while(valor < 17);
    console.log(valor);
    this.valorCrupierFinal = valor;

    console.log(this.manoCrupier.reverse());
    this.valorProvisional = this.manoCrupier[0].valor;
  }

  cartaRandom()
  {
    return Math.floor(Math.random() * (11 - 2 + 1) + 2);
  }

  caracterAleatorio()
  {
    const characters ='JQK';
    let result1= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 1; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
  }
}
