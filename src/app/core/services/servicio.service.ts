import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private API = API_CONFIG.url + '/servicios';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  crear(servicio:any){
    return this.http.post(this.API, servicio);
  }

  actualizar(id:number, servicio:any){
    return this.http.put(`${this.API}/${id}`, servicio);
  }

  eliminar(id:number){
    return this.http.delete(`${this.API}/${id}`);
  }

}

