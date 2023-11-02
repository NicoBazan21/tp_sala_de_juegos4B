import { Component } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {

  form!: FormGroup;
  constructor(private toastr: ToastrService, private encuestaService: EncuestasService,
    private userService: UserServiceService){}

  ngOnInit()
  {
    this.form = new FormGroup(
      {
        nombre: new FormControl("",[Validators.pattern('^[a-zA-Z ]+$'), Validators.required]),
        apellido: new FormControl("", [Validators.pattern('^[a-zA-Z ]+$'), Validators.required]),
        edad: new FormControl("", [Validators.max(99),Validators.min(18), Validators.required]),
        telefono: new FormControl("", [Validators.pattern('^[0-9]+$'),Validators.max(1000000000),Validators.required]),
        valoracion: new FormControl("", Validators.required),
        favorito: new FormControl("Mayor o menor", Validators.required),
        descripcion: new FormControl("", [Validators.maxLength(250),Validators.required])
      },Validators.required);
  }

  enviarEncuesta()
  {
    if(this.form.valid)
    {
      this.encuestaService.subirEncuestas(this.nombre?.value,
        this.apellido?.value,
        this.edad?.value,
        this.telefono?.value,
        this.valoracion?.value,
        this.favorito?.value,
        this.descripcion?.value,
        this.userService.sesionFirestore.mail
        ).then(()=>
        {
          this.toastr.success('', `Encuesta subida!.`,
          {
            tapToDismiss: true,
            progressBar: true,
            progressAnimation:'increasing',
            payload:true,
            positionClass: 'toast-top-right'
          });
        })
        this.form.reset();
    }
  }

  get nombre() {return this.form.get('nombre')}
  get apellido() {return this.form.get('apellido')}
  get edad() {return this.form.get('edad')}
  get telefono() {return this.form.get('telefono')}
  get valoracion() {return this.form.get('valoracion')}
  get favorito() {return this.form.get('favorito')}
  get descripcion() {return this.form.get('descripcion')}
}
