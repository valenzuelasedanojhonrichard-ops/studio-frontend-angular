import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private API = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) {}

  crear(venta:any): Observable<any> {
    return this.http.post(this.API, venta);
  }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  dashboard(){
  return this.http.get<any>('http://localhost:8080/api/ventas/dashboard');
  }

  buscar(texto:string){
    return this.http.get<any[]>(`${this.API}/buscar?texto=${texto}`);
  }


  filtrar(inicio:string, fin:string){
  return this.http.get<any[]>(
    `${this.API}/filtrar?inicio=${inicio}T00:00:00&fin=${fin}T23:59:59`
  );}

  reportePDF(inicio:string, fin:string){

  return this.http.get(
    `${this.API}/reporte/pdf?inicio=${inicio}T00:00:00&fin=${fin}T23:59:59`,
    {
      responseType: 'blob' // 🔥 CLAVE
    }
      );
    }
}
