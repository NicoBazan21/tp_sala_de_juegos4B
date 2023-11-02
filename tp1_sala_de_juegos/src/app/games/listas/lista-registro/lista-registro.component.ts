import { Component, OnInit } from '@angular/core';
import { ResultadosService } from 'src/app/services/resultados.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-lista-registro',
  templateUrl: './lista-registro.component.html',
  styleUrls: ['./lista-registro.component.css']
})
export class ListaRegistroComponent implements OnInit{

  lista: any;

  constructor(private resultadosService: ResultadosService, private userService: UserServiceService){}

  ngOnInit()
  {
    this.resultadosService.traerResultados(this.userService.sesionFirestore.mail)
    .subscribe((a)=>
    {
      this.lista = a;
    });
  }
}
