import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../core/services/cliente.service';
import { CitaService } from '../../core/services/citas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes:any[] = [];

  cliente:any = {
    nombre: '',
    telefono: '',
    email: ''
  };

  historial:any[] = [];
  mostrarHistorial = false;

  formVisible = false;
  editando = false;

  constructor(private clienteService: ClienteService,
                private citaService: CitaService){}

  ngOnInit(){
    this.listar();
  }

  listar(){
    this.clienteService.listar().subscribe(data=>{
      this.clientes = data;
    });
  }

  mostrarFormulario(){
    this.formVisible = true;
    this.editando = false;
    this.cliente = { nombre:'', telefono:'', email:'' };
  }

  guardar(){

    if(this.editando){

      this.clienteService.actualizar(this.cliente.id, this.cliente)
      .subscribe(()=>{
        this.listar();
        this.formVisible = false;
        this.editando = false;
      });

    }else{

      this.clienteService.crear(this.cliente)
      .subscribe(()=>{
        this.listar();
        this.formVisible = false;
      });

    }
  }

  editar(c:any){
    this.cliente = { ...c };
    this.formVisible = true;
    this.editando = true;
  }

  eliminar(id:number){
    this.clienteService.eliminar(id)
    .subscribe(()=>{
      this.listar();
    });
  }

  textoBuscar:string = '';

  buscar(){
    this.clienteService.buscar(this.textoBuscar)
      .subscribe(data => this.cliente = data);
  }


  verHistorial(id:number){

  this.citaService
  .listarPorClienteYEstado(id, 'ATENDIDA')
  .subscribe((data:any[]) => {

    this.historial = data;
    this.mostrarHistorial = true;

  });

}

}
