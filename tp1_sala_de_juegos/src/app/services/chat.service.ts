import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, Timestamp, collection, collectionData, doc, orderBy, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore) { }

  coleccionUsuarios: CollectionReference<DocumentData> = collection(this.firestore, 'chats');

  traerChats():Observable<any[]>
  {
    const chats = query(this.coleccionUsuarios, orderBy('fecha','asc'));
    return collectionData(chats) as Observable<any[]>;
  }

  subirMensaje(email: string, mensaje: string)
  {
    const documento = doc(this.coleccionUsuarios);
    const id = documento.id;
    const fecha = Timestamp.fromDate(new Date());
    return setDoc(documento,
      {
        id: id,
        mail: email,
        fecha: fecha,
        mensaje: mensaje,
      });
  }
}
