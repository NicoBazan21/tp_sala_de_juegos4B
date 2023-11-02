import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogGuard } from './guards/log.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule),
    canActivate: [LogGuard],
    canDeactivate: [LogGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
