import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  form!: FormGroup;
  protected chats!: Observable<any[]>;
  protected mailActual = '';
  constructor(private userService: UserServiceService,
              private chatService: ChatService){}

  ngOnInit()
  {
    this.form = new FormGroup(
      {
        mensaje: new FormControl("",[Validators.required]),
      },Validators.required);
    this.chats = this.chatService.traerChats();
    this.mailActual = this.userService.sesionFirestore.mail;
  }

  enviarMensaje()
  {
    if(this.form.valid)
    {
      let emisor = this.userService.sesionFirestore.mail;
      let mensaje = this.mensaje?.value;
      this.chatService.subirMensaje(emisor, mensaje);
      this.mensaje?.patchValue('');
    }
  }

  get mensaje()
  {
    return this.form.get('mensaje');
  }
}
