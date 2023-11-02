import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, query, setDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  constructor(private firestore: Firestore) { }

  coleccionResultados: CollectionReference<DocumentData> = collection(this.firestore, 'resultados');

  traerResultados(mail: string):Observable<any[]>
  {
    const resultados = query(this.coleccionResultados, where("mail","==",mail));
    return collectionData(resultados) as Observable<any[]>;
  }

  subirResultado(
    email: string,
    puntos: number,
    juego: string,
    resultado: string
    )
  {
    const documento = doc(this.coleccionResultados);
    const id = documento.id;
    return setDoc(documento,
      {
        id: id,
        mail: email,
        puntos: puntos,
        juego: juego,
        resultado: resultado
      });
  }
}
