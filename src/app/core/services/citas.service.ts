import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

   private API = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  crear(cita:any){
    return this.http.post(this.API, cita);
  }

  cancelar(id:number){
    return this.http.put(`${this.API}/${id}/cancelar`, {});
  }

  atender(id:number){
    return this.http.put(`${this.API}/${id}/atender`, {});
  }

  listarPorClienteYEstado(clienteId:number, estado:string){
  return this.http.get<any[]>(`${this.API}/cliente/${clienteId}/estado/${estado}`);
  }

  dashboard(){
    return this.http.get<any>(`${this.API}/dashboard`);
  }

  buscar(texto:string){
    return this.http.get<any[]>(`${this.API}/buscar?texto=${texto}`);
  }
}
