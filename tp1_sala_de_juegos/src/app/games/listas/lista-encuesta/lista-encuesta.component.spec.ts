import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEncuestaComponent } from './lista-encuesta.component';

describe('ListaEncuestaComponent', () => {
  let component: ListaEncuestaComponent;
  let fixture: ComponentFixture<ListaEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEncuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
