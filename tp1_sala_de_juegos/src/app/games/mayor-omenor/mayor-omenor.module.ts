import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayorOMenorRoutingModule } from './mayor-omenor-routing.module';
import { MayorOMenorComponent } from './mayor-omenor.component';


@NgModule({
  declarations: [
    MayorOMenorComponent
  ],
  imports: [
    CommonModule,
    MayorOMenorRoutingModule
  ]
})
export class MayorOMenorModule { }
