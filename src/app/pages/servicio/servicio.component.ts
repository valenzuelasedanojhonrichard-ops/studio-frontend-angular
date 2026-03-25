import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../core/services/servicio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.css'
})
export class ServiciosComponent implements OnInit {

  servicios:any[] = [];

  servicio:any = {
    nombre: '',
    precio: 0,
    duracionMinutos: 0
  };

  formVisible = false;
  editando = false;

  constructor(private servicioService: ServicioService){}

  ngOnInit(){
    this.listar();
  }

  listar(){
    this.servicioService.listar().subscribe(data=>{
      this.servicios = data;
    });
  }

  mostrarFormulario(){
    this.formVisible = true;
    this.editando = false;
    this.servicio = { nombre:'', precio:0, duracionMinutos:0 };
  }

  guardar(){

    if(this.editando){

      this.servicioService.actualizar(this.servicio.id, this.servicio)
      .subscribe(()=>{
        this.listar();
        this.formVisible = false;
        this.editando = false;
      });

    }else{

      this.servicioService.crear(this.servicio)
      .subscribe(()=>{
        this.listar();
        this.formVisible = false;
      });

    }
  }

  editar(s:any){
    this.servicio = { ...s };
    this.formVisible = true;
    this.editando = true;
  }

  eliminar(id:number){
    this.servicioService.eliminar(id)
    .subscribe(()=>{
      this.listar();
    });
  }

}

