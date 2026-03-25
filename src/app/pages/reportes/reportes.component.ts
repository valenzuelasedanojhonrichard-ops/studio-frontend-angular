import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../core/services/venta.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html'
})
export class ReportesComponent {

  ventas:any[] = [];

  inicio:string = '';
  fin:string = '';

  constructor(private ventaService: VentaService){}

  buscar(){
    this.ventaService.filtrar(this.inicio, this.fin)
      .subscribe((data:any[])=>{
        this.ventas = data;
      });
  }

  descargarPDF(){

  this.ventaService.reportePDF(this.inicio, this.fin)
    .subscribe((data:Blob)=>{

      const blob = new Blob([data], { type: 'application/pdf' });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte-ventas.pdf';
      a.click();

      window.URL.revokeObjectURL(url);
    });

}


}
