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

    this.ventaService.dashboard().subscribe((res:any)=>{
      this.ventas = res;
      this.crearGraficos();
    });

    this.citaService.dashboard().subscribe((res:any)=>{
      this.citas = res;
      this.crearGraficos();
    });

  }

  crearGraficos(){

    // 🔥 evitar duplicados
    if(this.graficoVentas){
      this.graficoVentas.destroy();
    }

    if(this.graficoCitas){
      this.graficoCitas.destroy();
    }

    // 🔥 GRAFICO VENTAS
    this.graficoVentas = new Chart("graficoVentas", {
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

    // 🔥 GRAFICO CITAS
    this.graficoCitas = new Chart("graficoCitas", {
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
