import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../core/services/productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  imports: [CommonModule,FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  productos:any[]=[];

  producto:any = {
    id:null,
    nombre:'',
    precio:0,
    marca:'',
    stock:0,
    stockMin:0
  };

  formVisible = false;
  editando = false;

  constructor(private productoService:ProductosService){}

  ngOnInit(){
    this.listar();
  }

  listar(){
    this.productoService.listar().subscribe(data=>{
      this.productos = data;
    });
  }

  mostrarFormulario(){
    this.formVisible = true;
  }

  guardar(){

    if(this.editando){

      this.productoService.actualizar(this.producto.id, this.producto)
      .subscribe(()=>{
        this.listar();
        this.formVisible = false;
        this.editando = false;
      });

    }else{

      this.productoService.crear(this.producto)
      .subscribe(()=>{

        this.listar();
        this.formVisible = false;

        this.producto = {
          id:null,
          nombre:'',
          precio:0,
          marca:'',
          stock:0,
          stockMin:0
        };

      });
    }
  }

  editar(p:any){

    this.producto = {...p,
    marca: p.marca || ''};

    this.formVisible = true;
    this.editando = true;

  }

  eliminar(id:number){
    this.productoService.eliminar(id)
    .subscribe(()=>{
      this.listar();
    });
  }

  textoBuscar:string = '';

  buscar(){
    this.productoService.buscar(this.textoBuscar)
      .subscribe(data =>
      this.productos = data);
  }


}

