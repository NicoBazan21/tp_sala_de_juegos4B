import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListasComponent } from './listas.component';
import { ListaEncuestaComponent } from './lista-encuesta/lista-encuesta.component';
import { ListaRegistroComponent } from './lista-registro/lista-registro.component';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  { path: '', component: ListasComponent ,
  children:
  [
    { path: 'tablaEncuesta' , component: ListaEncuestaComponent,
      canActivate: [AdminGuard],
    },
    { path: 'tablaRegistro' , component: ListaRegistroComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListasRoutingModule { }
