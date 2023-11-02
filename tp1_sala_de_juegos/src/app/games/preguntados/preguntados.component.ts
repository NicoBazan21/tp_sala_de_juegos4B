import { Component, OnInit } from '@angular/core';
import { PreguntadosService } from 'src/app/services/preguntados.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  protected numero = 0;
  preguntas!: any;
  opciones!: any;
  resetear = true;
  vidas = [0,1,2];
  puntos = 0;

  constructor(private preguntadosService: PreguntadosService,
    private userService: UserServiceService,
    private resultadosService: ResultadosService){}

  ngOnInit()
  {
    this.preguntadosService.traerPreguntas().subscribe((preguntas)=>
    {
      this.preguntas = preguntas;
      console.log(preguntas);
      this.mezclarPreguntas();
    });
  }

  onClick($event: any)
  {
    if(this.vidas.length)
    {
      if(this.preguntas[this.numero].correctAnswer == $event.srcElement.innerText)
      {
        Swal.fire({
          title: 'Correcto!.',
          text: 'En el blanco!.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Siguiente',
          background: '#3b293b',
        }).then((result)=>
        {
          this.puntos = this.puntos + 5;
          if(result.isConfirmed)
          {
            this.resetearJuego();
          }
        })
      }
      else
      {
          Swal.fire({
            title: 'Has perdido una vida!.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Siguiente',
            background: '#3b293b',
          }).then((result)=>
          {
            if(result.isConfirmed)
            {
              this.vidas.pop();
              this.resetearJuego();
            }
            if(this.vidas.length == 0)
            {
              Swal.fire({
                title: 'Te has quedado sin vidas!!.',
                text: 'Has acumulado un total de ' + this.puntos + ' puntos!.',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'Finalizar',
                background: '#3b293b',
              })
              this.userService.sesionFirestore.puntos += this.puntos;
              this.resultadosService.subirResultado(this.userService.sesionFirestore.mail,this.puntos,"Preguntados","Gano");
              this.userService.modificar(this.userService.sesionFirestore.mail);
            }
          })
      }
    }
  }

  mezclarPreguntas()
  {
    const opciones: string[] = this.preguntas[this.numero]!.incorrectAnswers;
    opciones!.push(this.preguntas[this.numero]!.correctAnswer!);

    for (let i = 0; i < opciones.length; i++)
    {
      const random = Math.floor(Math.random() * (i + 1));
      [opciones[i], opciones[random]] = [opciones[random], opciones[i]];
    }

    this.opciones = opciones;
  }

  resetearJuego()
  {
    if(this.resetear)
    {
      this.resetear = false;
      this.numero++;
      this.mezclarPreguntas();
      Swal.fire({
        title: 'Estas listo?.',
        icon: 'info',
        confirmButtonText: 'Si.',
        background: '#3b293b',
      }).then((result)=>
      {
        if(result.isConfirmed)
        {
          this.resetear = true;
        }
      })
    }
    else
    {
      this.resetear = true;
    }
    console.log(this.resetear);
  }
}
