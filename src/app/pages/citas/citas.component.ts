import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../core/services/citas.service';
import { ClienteService } from '../../core/services/cliente.service';
import { ServicioService } from '../../core/services/servicio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {

  citas:any[] = [];
  clientes:any[] = [];
  servicios:any[] = [];

  cita:any = {
    cliente: { id: null },
    servicio: { id: null },
    fechaHora: '',
    duracionMinutos: 0
  };

  formVisible = false;

  constructor(
    private citaService: CitaService,
    private clienteService: ClienteService,
    private servicioService: ServicioService
  ){}

  ngOnInit(){
    this.listar();
    this.cargarClientes();
    this.cargarServicios();
  }

  listar(){
    this.citaService.listar().subscribe(data=>{
      this.citas = data;
    });
  }

  cargarClientes(){
    this.clienteService.listar().subscribe(data=>{
      this.clientes = data;
    });
  }

  cargarServicios(){
    this.servicioService.listar().subscribe(data=>{
      this.servicios = data;
    });
  }

  mostrarFormulario(){
    this.formVisible = true;
  }

  guardar(){
    this.citaService.crear(this.cita)
    .subscribe({
      next: ()=>{
        this.listar();
        this.formVisible = false;
      },
      error: (err)=>{
        alert(err.error); // 🔥 muestra errores del backend
      }
    });
  }

  cancelar(id:number){
    this.citaService.cancelar(id).subscribe(()=>{
      this.listar();
    });
  }

  atender(id:number){
    this.citaService.atender(id).subscribe(()=>{
      this.listar();
    });
  }

  seleccionarServicio(){
    const s = this.servicios.find(x => x.id == this.cita.servicio.id);
    if(s){
      this.cita.duracionMinutos = s.duracionMinutos;
    }
  }

  textoBuscar:string = '';

  buscar(){
    this.citaService.buscar(this.textoBuscar)
      .subscribe(data => this.citas = data);
  }

}

