import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/user-service.service';
import { confirmarClave } from 'src/app/validadores/validaciones';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
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
        repiteClave: new FormControl("",),
      },confirmarClave());
  }

  guardar()
  {
    if(this.form.valid)
    {
      this.toastr.info('Aguarde un momento!.', `Registrando cuenta...`,
      {
        tapToDismiss: true,
        progressBar: true,
        progressAnimation:'increasing',
        payload:true,
        positionClass: 'toast-top-right'
      });
      this.userService.register(this.email?.value, this.clave?.value).then((log)=>
      {
        this.userService.guardar(this.email?.value).then((a)=>
        {
          this.router.navigateByUrl('/games');
        });
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
    this.router.navigateByUrl('login');
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
