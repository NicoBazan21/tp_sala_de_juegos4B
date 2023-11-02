import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(private firestore: Firestore) { }

  coleccionEncuestas: CollectionReference<DocumentData> = collection(this.firestore, 'encuestas');

  traerEncuestas():Observable<any[]>
  {
    const chats = query(this.coleccionEncuestas);
    return collectionData(chats) as Observable<any[]>;
  }

  subirEncuestas(
    nombre: string,
    apellido: string,
    edad: string,
    telefono: string,
    valoracion: string,
    favorito: string,
    descripcion: string,
    email: string
    )
  {
    const documento = doc(this.coleccionEncuestas);
    const id = documento.id;
    return setDoc(documento,
      {
        id: id,
        mail: email,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        telefono: telefono,
        valoracion: valoracion,
        favorito: favorito,
        descripcion: descripcion,
      });
  }
}
