import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from './pipes/date-format.pipe';


@NgModule({
  declarations: [
    ChatComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
})
export class ChatModule { }
