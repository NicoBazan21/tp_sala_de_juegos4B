import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListasRoutingModule } from './listas-routing.module';
import { ListasComponent } from './listas.component';
import { TablaComponent } from './tabla/tabla.component';
import { ListaEncuestaComponent } from './lista-encuesta/lista-encuesta.component';
import { ListaRegistroComponent } from './lista-registro/lista-registro.component';


@NgModule({
  declarations: [
    ListasComponent,
    TablaComponent,
    ListaEncuestaComponent,
    ListaRegistroComponent
  ],
  imports: [
    CommonModule,
    ListasRoutingModule
  ]
})
export class ListasModule { }
