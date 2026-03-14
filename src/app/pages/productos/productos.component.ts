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
    productos:any = {
    nombre:'',
    precio:0
    };

formVisible = false;

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

  this.productoService.crear(this.productos)
  .subscribe(()=>{

    this.listar(); // refrescar lista
    this.formVisible = false;

    this.productos = {
      nombre:'',
      precio:0
    };

  });

}

}
