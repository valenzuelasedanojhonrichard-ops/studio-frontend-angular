import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario{
  id:number
  username:string
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api="http://localhost:8080/api/auth"

  constructor(private http:HttpClient){}

  listarUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.api}/usuarios`)
  }

}
