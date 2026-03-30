import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

export interface Usuario{
  id:number
  username:string
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api= API_CONFIG.url ;

  constructor(private http:HttpClient){}

  listarUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.api}/usuarios`)
  }

}
