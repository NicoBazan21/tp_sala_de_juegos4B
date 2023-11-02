import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  constructor(private router: Router,
              public userService: UserServiceService,
              private toastr: ToastrService){}

  ngOnInit()
  {
    this.form = new FormGroup(
      {
        email: new FormControl("",[Validators.email, Validators.required]),
        clave: new FormControl("", [Validators.minLength(6), Validators.required]),
      },);
  }

  guardar()
  {
    if(this.form.valid)
    {
      this.toastr.info('Aguarde un momento!.', `Iniciando sesion...`,
      {
        tapToDismiss: true,
        progressBar: true,
        progressAnimation:'increasing',
        payload:true,
        positionClass: 'toast-top-right'
      });
      this.userService.login(this.email?.value, this.clave?.value).then((log)=>
      {
        this.router.navigateByUrl('/games');
      })
      .catch((error)=>
      {
        this.toastr.error(`${error}`, `Error.`,
          {
            tapToDismiss: true,
            progressBar: true,
            progressAnimation:'decreasing',
            closeButton: true,
            payload:true,
            positionClass: 'toast-top-right'
          });
      });
    }
    else
    {
      this.toastr.warning('Complete correctamente los campos.', `Atencion!.`,
      {
        tapToDismiss: true,
        progressBar: true,
        progressAnimation:'decreasing',
        closeButton: true,
        payload:true,
        positionClass: 'toast-top-right'
      });
    }
  }

  navigate()
  {
    this.router.navigateByUrl('register');
  }

  navigateAtras()
  {
    this.router.navigateByUrl('');
  }

  usuarioUno()
  {
    this.email?.patchValue('nicolasdarkar@gmail.com');
    this.clave?.patchValue('nicolas');
  }

  usuarioDos()
  {
    this.email?.patchValue('usuarioprueba@gmail.com');
    this.clave?.patchValue('nicolas');
  }

  usuarioTres()
  {
    this.email?.patchValue('usuariopruebatres@gmail.com');
    this.clave?.patchValue('nicolas');
  }
  get clave()
  {
    return this.form.get('clave');
  }
  get email()
  {
    return this.form.get('email');
  }
}
