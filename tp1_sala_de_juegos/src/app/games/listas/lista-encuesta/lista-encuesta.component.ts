import { Component, OnInit } from '@angular/core';
import { EncuestasService } from 'src/app/services/encuestas.service';

@Component({
  selector: 'app-lista-encuesta',
  templateUrl: './lista-encuesta.component.html',
  styleUrls: ['./lista-encuesta.component.css']
})
export class ListaEncuestaComponent implements OnInit
{
  lista: any;
  constructor(private encuestaService: EncuestasService){}

  ngOnInit()
  {
    this.encuestaService.traerEncuestas().subscribe((e)=>
    {
      this.lista = e;
    });
  }
}
