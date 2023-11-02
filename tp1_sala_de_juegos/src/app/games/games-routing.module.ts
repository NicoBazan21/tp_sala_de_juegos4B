import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';

const routes: Routes = [
  { path: '',
    component: GamesComponent,
    children:[
      { path: 'blackjack', loadChildren: () => import('./blackjack/blackjack.module').then(m => m.BlackjackModule) },
      { path: 'mayorOMenor', loadChildren: () => import('./mayor-omenor/mayor-omenor.module').then(m => m.MayorOMenorModule) },
      { path: 'ahorcado', loadChildren: () => import('./ahorcado/ahorcado.module').then(m => m.AhorcadoModule) },
      { path: 'preguntados', loadChildren: () => import('./preguntados/preguntados.module').then(m => m.PreguntadosModule) },
      { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
      { path: 'encuesta', loadChildren: () => import('./encuesta/encuesta.module').then(m => m.EncuestaModule) },
      { path: 'listas', loadChildren: () => import('./listas/listas.module').then(m => m.ListasModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
