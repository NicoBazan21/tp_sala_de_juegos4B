import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit{
  protected mail = '';
  protected sesion!: User;
  protected listaUsuarios: any = [];
  protected user: any = [];

  constructor(private toastr: ToastrService,
    private userService: UserServiceService,
    private router: Router) {}

  ngOnInit(){
    this.toastr.success('Bienvenido a la sala de juegos!.', `Sesion iniciada!.`,
    {
      tapToDismiss: true,
      progressBar: true,
      progressAnimation:'increasing',
      payload:true,
      positionClass: 'toast-top-right'
    });
    this.sesion = this.userService.obtenerSesion()!;
    this.userService.traerUsuarios().subscribe((a)=>
    {
      for(let item of a)
      {
        if(item['mail'] == this.sesion.email)
        {
          this.user = item;
          this.userService.sesionFirestore = this.user;
        }
      }
    })
  }

  cerrarSesion()
  {
    this.userService.logout().then(()=>
    {
      this.toastr.info('Cerrando sesion!.', `Hasta pronto!.`,
      {
        tapToDismiss: true,
        progressBar: true,
        progressAnimation:'increasing',
        payload:true,
        positionClass: 'toast-top-right'
      });
      this.router.navigateByUrl('login');
    });
  }
}
