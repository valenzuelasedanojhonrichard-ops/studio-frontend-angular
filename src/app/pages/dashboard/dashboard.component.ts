import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../core/services/venta.service';
import { CitaService } from '../../core/services/citas.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  ventas:any = {};
  citas:any = {};

  graficoVentas:any;
  graficoCitas:any;

  constructor(
    private ventaService: VentaService,
    private citaService: CitaService
  ){}

  ngOnInit(){

    // 🔥 PRIMERO ventas
    this.ventaService.dashboard().subscribe((res:any)=>{
      this.ventas = res;

      // 🔥 DESPUÉS citas
      this.citaService.dashboard().subscribe((res2:any)=>{
        this.citas = res2;

        // 🔥 RECIÉN AQUÍ crear gráficos
        this.crearGraficos();
      });

    });

  }

  crearGraficos(){

    // 🔥 eliminar gráficos previos
    if(this.graficoVentas){
      this.graficoVentas.destroy();
    }

    if(this.graficoCitas){
      this.graficoCitas.destroy();
    }

    // 🔥 GRAFICO VENTAS
    const canvasVentas = document.getElementById("graficoVentas") as HTMLCanvasElement;

    if(canvasVentas){
      this.graficoVentas = new Chart(canvasVentas, {
        type: 'doughnut',
        data: {
          labels: ['Hoy', 'Mes'],
          datasets: [{
            data: [
              this.ventas.ventasHoy || 0,
              this.ventas.ventasMes || 0
            ]
          }]
        }
      });
    }

    // 🔥 GRAFICO CITAS
    const canvasCitas = document.getElementById("graficoCitas") as HTMLCanvasElement;

    if(canvasCitas){
      this.graficoCitas = new Chart(canvasCitas, {
        type: 'doughnut',
        data: {
          labels: ['Reservadas', 'Atendidas', 'Canceladas'],
          datasets: [{
            data: [
              this.citas.reservadas || 0,
              this.citas.atendidas || 0,
              this.citas.canceladas || 0
            ]
          }]
        }
      });
    }

  }

}
