import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../core/services/venta.service';
import { CitaService } from '../../core/services/citas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  ventas:any = {};
  citas:any = {};

  constructor(
    private ventaService: VentaService,
    private citaService: CitaService
  ){}

  ngOnInit(){

    this.ventaService.dashboard().subscribe((res:any)=>{
      this.ventas = res;
    });

    this.citaService.dashboard().subscribe((res:any)=>{
      console.log(res);
      this.citas = res;
    });

  }

}
