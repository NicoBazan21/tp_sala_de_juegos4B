import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  sesionFirestore: any = [];
  constructor(private auth: Auth, private firestore: Firestore) { }

  coleccionUsuarios: CollectionReference<DocumentData> = collection(this.firestore, 'usuarios');

  modificar(user: any)
  {
    const documento = doc(this.coleccionUsuarios, this.sesionFirestore.id);
    updateDoc(documento, {...this.sesionFirestore});
  }

  guardar(email: string)
  {
    const documento = doc(this.coleccionUsuarios);
    const id = documento.id;
    return setDoc(documento,
      {
        id: id,
        mail: email,
        fechaDeCreacion: new Date().toLocaleString(),
        puntos: 0
      });
  }

  traerUsuarios()
  {
      return collectionData(this.coleccionUsuarios);
  }

  register(email: string, pass:string)
  {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  login(email: string, pass:string)
  {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  logout()
  {
    return signOut(this.auth);
  }

  obtenerSesion()
  {
    return this.auth.currentUser;
  }
}
