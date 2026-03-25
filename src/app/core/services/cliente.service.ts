import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private API = API_CONFIG.url + '/clientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  crear(cliente:any){
    return this.http.post(this.API, cliente);
  }

  actualizar(id:number, cliente:any){
    return this.http.put(`${this.API}/${id}`, cliente);
  }

  eliminar(id:number){
    return this.http.delete(`${this.API}/${id}`);
  }

  buscar(texto:string){
  return this.http.get<any[]>(`${this.API}/buscar?texto=${texto}`);
  }


}

